WITHOUT_HELMET = 1

def detect_no_helmet(associations):

    violations = []

    for motorcycle, helmets in associations:

        for helmet in helmets:

            if helmet.class_id == WITHOUT_HELMET:
                violations.append(motorcycle)
                break

    return violations