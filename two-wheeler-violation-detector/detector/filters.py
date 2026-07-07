NUMBER_PLATE = 0
WITHOUT_HELMET = 1
BAD_HELMET = 2
GOOD_HELMET = 3
MOTORCYCLE = 4


def get_motorcycles(detections):

    return [
        detection
        for detection in detections
        if detection.class_id == MOTORCYCLE
    ]


def get_helmets(detections):

    return [
        detection
        for detection in detections
        if detection.class_id in [
            WITHOUT_HELMET,
            BAD_HELMET,
            GOOD_HELMET
        ]
    ]


def get_numberplates(detections):

    return [
        detection
        for detection in detections
        if detection.class_id == NUMBER_PLATE
    ]


def get_without_helmet(detections):

    return [
        detection
        for detection in detections
        if detection.class_id == WITHOUT_HELMET
    ]


def get_good_helmet(detections):

    return [
        detection
        for detection in detections
        if detection.class_id == GOOD_HELMET
    ]


def get_bad_helmet(detections):

    return [
        detection
        for detection in detections
        if detection.class_id == BAD_HELMET
    ]