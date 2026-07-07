import cv2


def point_inside_box(point, box):

    cx, cy = point

    x1, y1, x2, y2 = box

    return (
        x1 <= cx <= x2 and
        y1 <= cy <= y2
    )


def draw_center(frame, point):

    cv2.circle(
        frame,
        (int(point[0]), int(point[1])),
        5,
        (0, 255, 0),
        -1
    )


def draw_box(frame, box, color=(255, 0, 0)):

    x1, y1, x2, y2 = map(int, box)

    cv2.rectangle(
        frame,
        (x1, y1),
        (x2, y2),
        color,
        2
    )


def draw_text(frame, text, y):

    cv2.putText(
        frame,
        text,
        (30, y),
        cv2.FONT_HERSHEY_SIMPLEX,
        1.2,
        (0, 0, 255),
        3,
        cv2.LINE_AA
    )