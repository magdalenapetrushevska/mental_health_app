from database import Base
from sqlalchemy import String,Boolean,Integer,Column,Text, BigInteger,Date, ForeignKey, DateTime,Time
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from enum import Enum
import datetime



class User(Base):
    __tablename__='users'
    id=Column(BigInteger,primary_key=True, autoincrement=True)
    username=Column(String(255), unique=True,nullable=False)
    password=Column(String(255),nullable=False)
    phone_number=Column(String(255),nullable=False)


class Post(Base):
    __tablename__='posts'
    id=Column(BigInteger,primary_key=True, autoincrement=True)
    title=Column(String(255),nullable=False,unique=True)
    content=Column(Text)
    posted=Column(Date, default=func.current_date())
    updated = Column(Date, nullable=True)
    comments = relationship("Comment")
    user_id = Column(BigInteger, ForeignKey("users.id"))


class Comment(Base):
    __tablename__='comments'
    id=Column(BigInteger,primary_key=True, autoincrement=True)
    content=Column(Text)
    posted=Column(Date, default=func.current_date())
    updated = Column(Date, nullable=True)
    num_of_likes= Column(Integer, default=0)
    post_id = Column(BigInteger, ForeignKey("posts.id"))
    user_id = Column(BigInteger, ForeignKey("users.id"))


class MoodOptions(str, Enum):
    GREAT = "GREAT"
    GOOD = "GOOD"
    OKAY = "OKAY"
    BAD = "BAD"
    AWFUL = "AWFUL"

    @staticmethod
    def list():
        return list(map(lambda c: c.value, MoodOptions))


class MoodHistory(Base):
    __tablename__='moods'
    id=Column(BigInteger,primary_key=True, autoincrement=True)
    mood = Column(String(255),nullable=False)
    date_time=Column(DateTime, default=datetime.datetime.utcnow)
    description=Column(Text, nullable=True)
    user_id = Column(BigInteger, ForeignKey("users.id"))


class Reminder(Base):
    __tablename__='reminders'
    id=Column(BigInteger,primary_key=True, autoincrement=True)
    name = Column(String(255),nullable=False)
    quantity = Column(Integer,nullable=False)
    start_date = Column(Date)
    end_date=Column(Date)
    publish_time=Column(Time)
    user_phone_number=Column(String(255),nullable=False)
    user_id = Column(BigInteger, ForeignKey("users.id"))


