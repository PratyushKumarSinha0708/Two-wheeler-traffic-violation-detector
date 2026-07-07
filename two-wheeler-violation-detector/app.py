from fastapi import FastAPI
from pydantic import BaseModel

from detector_engine import detect_file

app = FastAPI()


class DetectionRequest(BaseModel):
    file_path: str


@app.get("/")
def home():

    return {
        "message": "Two Wheeler Traffic Violation Detector API"
    }


@app.post("/detect")
def detect(request: DetectionRequest):

    result = detect_file(request.file_path)

    return result