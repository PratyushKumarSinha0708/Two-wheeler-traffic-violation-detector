import cv2


def draw_violations(frame, helmet_violations, triple_violations):

    y = 50

    if len(helmet_violations) > 0:

        cv2.putText(
            frame,
            "TRAFFIC VIOLATION: NO HELMET",
            (30, y),
            cv2.FONT_HERSHEY_SIMPLEX,
            1.2,
            (0, 0, 255),
            3,
            cv2.LINE_AA
        )

        y += 50

    if len(triple_violations) > 0:

        cv2.putText(
            frame,
            "TRAFFIC VIOLATION: TRIPLE RIDING",
            (30, y),
            cv2.FONT_HERSHEY_SIMPLEX,
            1.2,
            (0, 0, 255),
            3,
            cv2.LINE_AA
        )