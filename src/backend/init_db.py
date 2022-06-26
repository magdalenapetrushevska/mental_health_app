from database import Base,engine
from models import Post


print("Creating database ....")


Base.metadata.create_all(engine)