from detector_engine import detect_file


def main():

    # Change this to any image or video
    file_path = "two-wheeler-violation-detector/videos/Combined_Violation_2.mp4"

    result = detect_file(file_path)

    print("\n===== Detection Result =====")

    print(result)


if __name__ == "__main__":
    main()