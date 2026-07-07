from pathlib import Path

# ---------------- Paths ---------------- #

BASE_DIR = Path(__file__).parent

MODEL_PATH = BASE_DIR / "models" / "best.pt"

UPLOAD_FOLDER = BASE_DIR / "uploads"

OUTPUT_FOLDER = BASE_DIR / "outputs"

OUTPUT_VIDEO = OUTPUT_FOLDER / "output_video.mp4"

VIOLATION_IMAGE = OUTPUT_FOLDER / "violation.jpg"

# ---------------- Detection ---------------- #

FRAME_SKIP = 5

CONFIDENCE = 0.50

# ---------------- Supported files ---------------- #

IMAGE_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png"
]

VIDEO_EXTENSIONS = [
    ".mp4",
    ".avi",
    ".mov",
    ".mkv"
]