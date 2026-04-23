import requests
import uuid

def download_file(file_url: str):
    file_path = f"temp_{uuid.uuid4()}.pdf"

    response = requests.get(file_url)

    if response.status_code != 200:
        raise Exception("Failed to download file")

    with open(file_path, "wb") as f:
        f.write(response.content)

    return file_path