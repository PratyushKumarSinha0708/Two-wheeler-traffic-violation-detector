from detector.classes import Detection


def parse_results(results, model):

    detections = []

    if results[0].boxes is None:
        return detections

    for box in results[0].boxes:

        cls = int(box.cls[0])

        confidence = float(box.conf[0])

        x1, y1, x2, y2 = box.xyxy[0].tolist()

        detections.append(
            Detection(
                class_id=cls,
                class_name=model.names[cls],
                confidence=confidence,
                x1=x1,
                y1=y1,
                x2=x2,
                y2=y2
            )
        )

    return detections