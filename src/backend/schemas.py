from pydantic import BaseModel
from typing import Optional
from datetime import date,time

from sqlalchemy import BigInteger

class Post(BaseModel):
    id:Optional[int]
    title:str
    content:str
    posted:Optional[date]
    updated:Optional[date]
    #comments:Optional[list]


    class Config:
        orm_mode=True
        

class Comment(BaseModel):
    id:Optional[int]
    content:str
    posted:Optional[date]
    updated:Optional[date]
    post_id:Optional[int]
    num_of_likes:Optional[int]


    class Config:
        orm_mode=True


class RegisterRequest(BaseModel):
    username: str
    password: str
    phone_number:str


class LoginRequest(BaseModel):
    username: str
    password: str



class RateMoodForm(BaseModel):
    category:Optional[str]
    description:Optional[str]


class MoodHistoryDates(BaseModel):
    start_date:date
    end_date:date


class Reminder(BaseModel):
    name : str
    quantity : int
    start_date : date
    end_date : date
    publish_time : time