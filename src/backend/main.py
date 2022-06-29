from datetime import date,datetime,timedelta
from distutils.command.build import build
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional,List
import schemas
from fastapi.responses import FileResponse,RedirectResponse

from fastapi import FastAPI, Form, status, Depends, HTTPException
from fastapi.responses import FileResponse, RedirectResponse
from typing import Union, Any
from sqlalchemy import false
from database import SessionLocal
from sqlalchemy.sql import func
import models
from fpdf import FPDF
from twilio.rest import Client
import jwt
import config
import asyncio
from fastapi.security import HTTPBearer
from pydantic import ValidationError
from fastapi_utils.tasks import repeat_every
import pandas as pd


SECURITY_ALGORITHM = 'HS256'
SECRET_KEY = '123456'


app=FastAPI()
settings = config.Settings()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

reusable_oauth2 = HTTPBearer(
    scheme_name='Authorization'
)


db=SessionLocal()




#####################################################   SCHEDULING

def send_sms(to_number, body):
    client = Client(settings.twilio_account_sid, settings.twilio_auth_token)
    return client.messages.create(from_=settings.twilio_phone_number,
                                  to=to_number, body=body)


async def handle_sms(phone: str, message:str):
    await asyncio.get_event_loop().run_in_executor(
        None, send_sms, phone, message)




def delete_obsolate_reminder(id:int):
    reminder_to_delete = db.query(models.Reminder).filter(models.Reminder.id==id).first()

    if reminder_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reminder not found")
    
    db.delete(reminder_to_delete)
    db.commit()




async def job():
    reminders = db.query(models.Reminder).all()
    for item in reminders:
        today = date.today()

        if item.end_date < today:
            delete_obsolate_reminder(item.id)

    
        current_time = datetime.now()
        if item.publish_time.hour == current_time.hour and item.publish_time.minute == current_time.minute:
            # here we define the format of the message to be sent
            message = ""
            message+="It is time for you to take your medication. \n"
            message+="Medication name:  "
            message+=str(item.name)
            message+=str("\n")
            message+=str("Quantity:  ")
            message+=str(item.quantity)

            
            phone = item.user_phone_number
            handle_sms(phone, message)




@app.on_event("startup")
@repeat_every(seconds=60)  
def remove_expired_tokens_task() -> None:
    job()




################################################################ AUTHENTICATION


# method to verify user password
def verify_password(username, password):
    user = db.query(models.User).filter(username == models.User.username).first()
    if user is None:
        return false 
    if password == user.password:
        return True
    return False



# method to generate token
def generate_token(username: Union[str, Any]) -> str:
    expire = datetime.now() + timedelta(
        seconds = 259200
    )
    
    to_encode = {
        "exp": expire, "username": username
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)
    return encoded_jwt



# method to valdate token
def validate_token(http_authorization_credentials=Depends(reusable_oauth2)) -> str:
    """
    Decode JWT token to get username => return username
    """
    try:
        payload = jwt.decode(http_authorization_credentials.credentials, SECRET_KEY, algorithms=[SECURITY_ALGORITHM])

        current_username = payload.get('username')
        current_user = db.query(models.User).filter(current_username == models.User.username).first()
        return current_user
    except(jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=403,
            detail=f"Could not validate credentials",
        )



# method to get the current user
# @app.get("/current")
# def get_current_user(http_authorization_credentials=Depends(reusable_oauth2)) -> str:
#     try:
#         payload = jwt.decode(http_authorization_credentials.credentials, SECRET_KEY, algorithms=[SECURITY_ALGORITHM])
#         print('printame username od funkciju')
#         print(payload.get('username'))
#         print("printamo password of funkcija sto se testira:")
#         print(payload.get('password'))
#         current_username = payload.get('username')
#         current_user = db.query(models.User).filter(current_username == models.User.username).first()
#         return current_user
#     except(jwt.PyJWTError, ValidationError):
#         raise HTTPException(
#             status_code=403,
#             detail=f"Could not validate credentials",
#         )

# helper method to get the current user
def get_current_user(http_authorization_credentials: str = Depends(reusable_oauth2)):
    try:
        payload = jwt.decode(http_authorization_credentials.credentials, SECRET_KEY, algorithms=[SECURITY_ALGORITHM])
       

        current_username = payload.get('username')
        current_user = db.query(models.User).filter(current_username == models.User.username).first()
        return current_user
    except(jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=403,
            detail=f"Could not validate credentials",
        )





# login method
@app.post('/api/login',tags=["auth"])
def login(request_data: schemas.LoginRequest):
    print(f'[x] request_data: {request_data.__dict__}')
    if verify_password(username=request_data.username, password=request_data.password):
        token = generate_token(request_data.username)
        return {
            'token': token
        }
    else:
        raise HTTPException(status_code=404, detail="User not found")


# register method
@app.post('/api/register',status_code=status.HTTP_201_CREATED, tags=["auth"])
def create_new_post(user: schemas.RegisterRequest):
    db_item=db.query(models.User).filter(models.User.username==user.username).first()

    if db_item is not None:
        raise HTTPException(status_code=400,detail="User already exists")


    new_user=models.User(
        username=user.username,    
        password=user.password,
        phone_number = user.phone_number
    )


    db.add(new_user)
    db.commit()

    return new_user






##################################################################### POSTS

# method to get all posts
@app.get("/api/posts",response_model=List[schemas.Post], status_code=status.HTTP_200_OK,tags=["posts"])
def get_all_posts():
    return db.query(models.Post).all()


# method to get the posts of the current user
@app.get("/api/owner-posts", response_model=List[schemas.Post], status_code=status.HTTP_200_OK,tags=["posts"])
def get_owner_posts(http_authorization_credentials: str = Depends(reusable_oauth2)):
    current_user = get_current_user(http_authorization_credentials)
    return db.query(models.Post).filter(current_user.id == models.Post.user_id).all()


# method to get post with specific id
@app.get("/api/post/{id}", response_model=schemas.Post, status_code=status.HTTP_200_OK,tags=["posts"])
def get_an_post(id:int):
    return db.query(models.Post).filter(id == models.Post.id).first()



# method to add new post
@app.post('/api/posts',response_model=schemas.Post,
        status_code=status.HTTP_201_CREATED,tags=["posts"])
def create_new_post(post:schemas.Post,http_authorization_credentials: str = Depends(reusable_oauth2)):
   
    current_user =get_current_user(http_authorization_credentials)

    db_item=db.query(models.Post).filter(models.Post.title==post.title).first()

    if db_item is not None:
        raise HTTPException(status_code=400,detail="Post already exists")


    new_post=models.Post( 
        title=post.title,    
        content=post.content,
        comments = [],
        user_id = current_user.id
    )


    db.add(new_post)
    db.commit()

    return new_post


# method to update a post
@app.put("/api/post/{id}",response_model=schemas.Post, status_code=status.HTTP_200_OK,tags=["posts"],dependencies=[Depends(validate_token)])
def update_post(id:int,post:schemas.Post):
    post_to_update = db.query(models.Post).filter(models.Post.id == id).first()
    post_to_update.title=post.title
    post_to_update.content=post.content
    post_to_update.updated=func.current_date()

    db.commit()

    return post_to_update


# method to delete a post
@app.delete("/api/post/{id}",tags=["posts"],dependencies=[Depends(validate_token)])
def delete_a_post(id:int):
    post_to_delete = db.query(models.Post).filter(models.Post.id==id).first()

    if post_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    db.delete(post_to_delete)
    db.commit()

    return post_to_delete



#########################################################################  COMMENTS


# method to add new comment
@app.post('/api/add-comment/{id}',response_model=schemas.Comment,
        status_code=status.HTTP_201_CREATED,tags=["comments"])
def create_new_comment(id:int,comment:schemas.Comment,http_authorization_credentials: str = Depends(reusable_oauth2)):
    
    db_item=db.query(models.Post).filter(models.Post.id==id).first()

    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

    current_user =get_current_user(http_authorization_credentials)
    
    new_comment=models.Comment( 
        content=comment.content,    
        post_id=id,
        user_id = current_user.id
    )

    db.add(new_comment)

    db.commit()

    return new_comment



# method to delete a comment
@app.delete("/api/comments/delete/{id}",tags=["comments"],dependencies=[Depends(validate_token)])
def delete_comment(id:int):
    comment_to_delete = db.query(models.Comment).filter(models.Comment.id==id).first()

    if comment_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    
    db.delete(comment_to_delete)
    db.commit()

    return comment_to_delete



# method to get all comments for post with specific id
@app.get("/api/comments/{id}", status_code=status.HTTP_200_OK,tags=["comments"])
def get_all_comments(id:int):
    return db.query(models.Comment).filter(id == models.Comment.post_id).all()



# method to increase number of likes for specific comment
@app.post("/api/like/{id}", status_code=status.HTTP_200_OK,tags=["comments"])
def like_a_comment(id:int):
    comment_to_like = db.query(models.Comment).filter(models.Comment.id==id).first()

    if comment_to_like is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    
    num_likes = comment_to_like.num_of_likes
    num_likes += 1 

    comment_to_like.num_of_likes=num_likes

    db.commit()

    return comment_to_like


#####################################################   MOOD RECORDS


# method to get mood options
@app.get("/api/moods",tags=["moods"])
def get_mood_options():
    enum_list = models.MoodOptions.list()
    return enum_list


# method to add new mood
@app.post("/api/new-mood",tags=["moods"])
def get_activities(form:schemas.RateMoodForm, http_authorization_credentials: str = Depends(reusable_oauth2)):

    current_user =get_current_user(http_authorization_credentials)

    new_mood=models.MoodHistory( 
      mood = form.category,
      description = form.description,
      user_id = current_user.id
    )

    db.add(new_mood)
    db.commit()

    return new_mood



# method to get the mood history of a current user
@app.get("/api/mood-history",tags=["moods"])
def get_mood_history(http_authorization_credentials: str = Depends(reusable_oauth2)):
    current_user = get_current_user(http_authorization_credentials)
    return db.query(models.MoodHistory).filter(current_user.id == models.MoodHistory.user_id).all()



# method to generate pdf for entire mood history of the current user
@app.get("/api/export-pdf",tags=["moods"])
def generate_pdf_doc(http_authorization_credentials: str = Depends(reusable_oauth2)):

    current_user = get_current_user(http_authorization_credentials)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    builder = ""
    builder+="\n Mood history \n\n"
    builder+="User: "
    builder+=str(current_user.username)
    builder+="\n\n"

    lista = db.query(models.MoodHistory).filter(current_user.id == models.MoodHistory.user_id).all()

    for item in lista:
        builder+="\n"
        builder+=str("Date:   ")
        builder+=str(item.date_time)
        builder+=str("\n")
        builder+=str("Mood:   ")
        builder+=str(item.mood)
        builder+=str("\n")
        builder+=str("Description:  ")
        builder+=str(item.description)
        builder+=str("\n")
        builder+=str("-----------------------------------------------")
        builder+=str("-----------------------------------------------")
    pdf.multi_cell(200, 10, txt=builder, align="C")
    pdf.output('mood_history_files/moodHistory.pdf')
    return FileResponse("mood_history_files/moodHistory.pdf")






############################################### REMINDERS


# method to add new reminder
@app.post('/api/reminders',
        status_code=status.HTTP_201_CREATED, tags=["reminders"])
def create_new_reminder(reminder:schemas.Reminder,http_authorization_credentials: str = Depends(reusable_oauth2)):

    current_user = get_current_user(http_authorization_credentials)

    new_reminder=models.Reminder( 
        name=reminder.name,    
        quantity=reminder.quantity,
        start_date = reminder.start_date,
        end_date = reminder.end_date,
        publish_time = reminder.publish_time,
        user_phone_number = current_user.phone_number,
        user_id = current_user.id
    )

    db.add(new_reminder)
    db.commit()

    return new_reminder


# method to get all reminders for current user
@app.get("/api/reminders", status_code=status.HTTP_200_OK,tags=["reminders"])
def get_all_reminders(http_authorization_credentials: str = Depends(reusable_oauth2)):
    current_user = get_current_user(http_authorization_credentials)
    return db.query(models.Reminder).filter(current_user.id == models.Reminder.user_id).all()


# method to delete a reminder
@app.delete("/api/reminder/{id}",tags=["reminders"],dependencies=[Depends(validate_token)])
def delete_a_reminder(id:int):
    reminder_to_delete = db.query(models.Reminder).filter(models.Reminder.id==id).first()

    if reminder_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reminder not found")
    
    db.delete(reminder_to_delete)
    db.commit()

    return reminder_to_delete




# method to get reminder with specific id
@app.get("/api/reminder/{id}", status_code=status.HTTP_200_OK,tags=["reminders"])
def get_a_reminder(id:int):
    return db.query(models.Reminder).filter(id == models.Reminder.id).first()


# method to update a reminder
@app.put("/api/reminder/{id}", status_code=status.HTTP_200_OK,tags=["reminders"],dependencies=[Depends(validate_token)])
def update_reminder(id:int,reminder:schemas.Reminder):
    reminder_to_update = db.query(models.Reminder).filter(models.Reminder.id == id).first()
    reminder_to_update.name=reminder.name
    reminder_to_update.quantity=reminder.quantity
    reminder_to_update.start_date=reminder.start_date
    reminder_to_update.end_date=reminder.end_date
    reminder_to_update.publish_time=reminder.publish_time

    db.commit()

    return reminder_to_update