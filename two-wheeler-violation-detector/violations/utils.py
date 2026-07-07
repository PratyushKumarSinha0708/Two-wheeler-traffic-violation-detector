from detector.utils import point_inside_box

def associate_helmets(motorcycles, helmets):

    associations = []

    for motorcycle in motorcycles:

        associated = []

        for helmet in helmets:

            if point_inside_box(
                helmet.center,
                motorcycle.box
            ):
                associated.append(helmet)

        associations.append((motorcycle, associated))

    return associations