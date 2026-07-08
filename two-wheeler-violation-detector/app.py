from fastapi import FastAPI, UploadFile, File
import os
import shutil
import uuid

from detector_engine import detect_file

app = FastAPI()

# Temporary upload folder
UPLOAD_FOLDER = "temp_uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():

    return {
        "message": "Two Wheeler Traffic Violation Detector API"
    }


@app.post("/detect")
def detect(file: UploadFile = File(...)):

    # Create a unique filename
    extension = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{extension}"

    file_path = os.path.join(UPLOAD_FOLDER, filename)

    # Save uploaded file temporarily
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Run your detector
        result = detect_file(file_path)

    finally:
        # Delete temporary file after processing
        if os.path.exists(file_path):
            os.remove(file_path)

    return result