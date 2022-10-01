from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from recognize_image import *

class Item(BaseModel):
    imgUrl: str


app = FastAPI()



@app.post("/imgModel/")
async def create_item(item: Item):
    recognise_image(item.imgUrl)

