import os
import cv2

from config import *

# ---------------- Detector ---------------- #
from detector.detector import Detector
from detector.parser import parse_results
from detector.filters import get_motorcycles, get_helmets
from detector.utils import draw_center, point_inside_box

# ---------------- Violations ---------------- #
from violations.utils import associate_helmets
from violations.helmet import detect_no_helmet
from violations.triple import detect_triple_riding
from violations.draw import draw_violations


# Load model ONCE
detector = Detector(str(MODEL_PATH))


def process_frame(frame):

    """
    Process one frame and return:
    - annotated frame
    - helmet violations
    - triple riding violations
    """

    results = detector.detect(frame)

    annotated_frame = results[0].plot()

    detections = parse_results(results, detector.model)

    motorcycles = get_motorcycles(detections)

    helmets = get_helmets(detections)

    helmet_map = associate_helmets(
        motorcycles,
        helmets
    )

    helmet_violations = detect_no_helmet(
        helmet_map
    )

    triple_violations = detect_triple_riding(
        helmet_map
    )

    draw_violations(
        annotated_frame,
        helmet_violations,
        triple_violations
    )

    # Draw helmet centers (optional)
    for bike in motorcycles:

        for helmet in helmets:

            if point_inside_box(
                helmet.center,
                bike.box
            ):

                draw_center(
                    annotated_frame,
                    helmet.center
                )

    return (
        annotated_frame,
        helmet_violations,
        triple_violations
    )


def process_image(image_path):

    frame = cv2.imread(image_path)

    if frame is None:

        return {
            "status": "error",
            "message": "Cannot open image."
        }

    annotated_frame, helmet, triple = process_frame(frame)

    violation_count = len(helmet) + len(triple)

    if violation_count > 0:

        cv2.imwrite(
            str(VIOLATION_IMAGE),
            annotated_frame
        )

    return {
        "status": "success",
        "violation": violation_count > 0,
        "violation_types": {
            "helmet": len(helmet),
            "triple": len(triple)
        },
        "image_path": str(VIOLATION_IMAGE)
        if violation_count > 0 else None
    }


def process_video(video_path):

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():

        return {
            "status": "error",
            "message": "Cannot open video."
        }

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")

    out = cv2.VideoWriter(
        str(OUTPUT_VIDEO),
        fourcc,
        fps,
        (width, height)
    )

    max_violation = 0

    violation_types = {
        "helmet": 0,
        "triple": 0
    }

    while True:

        ret, frame = cap.read()

        if not ret:
            break

        annotated_frame, helmet, triple = process_frame(frame)

        out.write(annotated_frame)

        count = len(helmet) + len(triple)

        if count >= max_violation:

            max_violation = count

            violation_types["helmet"] = len(helmet)
            violation_types["triple"] = len(triple)

            cv2.imwrite(
                str(VIOLATION_IMAGE),
                annotated_frame
            )

        # Skip frames
        for _ in range(FRAME_SKIP - 1):

            if not cap.grab():
                break

    cap.release()
    out.release()

    return {
        "status": "success",
        "violation": max_violation > 0,
        "violation_types": violation_types,
        "image_path": str(VIOLATION_IMAGE)
        if max_violation > 0 else None,
        "video_path": str(OUTPUT_VIDEO)
    }


def detect_file(file_path):

    ext = os.path.splitext(file_path)[1].lower()

    if ext in IMAGE_EXTENSIONS:

        return process_image(file_path)

    elif ext in VIDEO_EXTENSIONS:

        return process_video(file_path)

    return {
        "status": "error",
        "message": "Unsupported file format."
    }