from dataclasses import dataclass

@dataclass
class Detection:
    class_id: int
    class_name: str
    confidence: float
    x1: float
    y1: float
    x2: float
    y2: float

    @property
    def center(self):
        return (
            (self.x1 + self.x2) / 2,
            (self.y1 + self.y2) / 2
        )

    @property
    def box(self):
        return (
            self.x1,
            self.y1,
            self.x2,
            self.y2
        )