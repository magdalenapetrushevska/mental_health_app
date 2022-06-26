from datetime import date,datetime
from distutils.command.build import build
from fastapi import FastAPI,status,HTTPException,Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional,List
import schemas
from fastapi.responses import FileResponse,RedirectResponse
from enum import Enum
import random
import time
import asyncio
from fastapi import FastAPI, Form, status
from fastapi.responses import FileResponse, RedirectResponse


from database import SessionLocal
from sqlalchemy.sql import func
import models

app=FastAPI()


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



db=SessionLocal()


# method to get all posts
@app.get("/api/posts",response_model=List[schemas.Post], status_code=status.HTTP_200_OK,tags=["posts"])
def get_all_posts():
    return db.query(models.Post).all()


# method to get post with specific id
@app.get("/api/post/{id}", response_model=schemas.Post, status_code=status.HTTP_200_OK,tags=["posts"])
def get_an_post(id:int):
    return db.query(models.Post).filter(id == models.Post.id).first()


# method to add new post
@app.post('/api/posts',response_model=schemas.Post,
        status_code=status.HTTP_201_CREATED,tags=["posts"])
def create_new_post(post:schemas.Post):
    db_item=db.query(models.Post).filter(models.Post.title==post.title).first()

    if db_item is not None:
        raise HTTPException(status_code=400,detail="Post already exists")


    new_post=models.Post( 
        title=post.title,    
        content=post.content,
        comments = []
    )


    db.add(new_post)
    db.commit()

    return new_post


# method to update a post
@app.put("/api/post/{id}",response_model=schemas.Post, status_code=status.HTTP_200_OK,tags=["posts"])
def update_post(id:int,post:schemas.Post):
    post_to_update = db.query(models.Post).filter(models.Post.id == id).first()
    post_to_update.title=post.title
    post_to_update.content=post.content
    post_to_update.updated=func.current_date()

    db.commit()

    return post_to_update


# method to delete a post
@app.delete("/api/post/{id}",tags=["posts"])
def delete_a_post(id:int):
    post_to_delete = db.query(models.Post).filter(models.Post.id==id).first()

    if post_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    db.delete(post_to_delete)
    db.commit()

    return post_to_delete



#########################################################################


# method to add new comment
@app.post('/api/add-comment/{id}',response_model=schemas.Comment,
        status_code=status.HTTP_201_CREATED,tags=["comments"])
def create_new_comment(id:int,comment:schemas.Comment):
    
    db_item=db.query(models.Post).filter(models.Post.id==id).first()

    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    new_comment=models.Comment( 
        content=comment.content,    
        post_id=id
    )

    db.add(new_comment)

    db.commit()

    return new_comment



# method to delete a comment
@app.delete("/api/comments/delete/{id}",tags=["comments"])
def delete_comment(id:int):
    comment_to_delete = db.query(models.Comment).filter(models.Comment.id==id).first()

    if comment_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    
    db.delete(comment_to_delete)
    db.commit()

    return comment_to_delete



# method to get all comments for post with specific id
@app.get("/api/{id}/comments", status_code=status.HTTP_200_OK,tags=["comments"])
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

