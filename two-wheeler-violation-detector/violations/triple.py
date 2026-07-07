def detect_triple_riding(associations):

    violations = []

    for motorcycle, helmets in associations:

        print("Bike:", motorcycle.box)
        print("Associated detections:", len(helmets))

        for h in helmets:
            print("Class:", h.class_id)

        if len(helmets) >= 3:
            violations.append(motorcycle)

    return violations