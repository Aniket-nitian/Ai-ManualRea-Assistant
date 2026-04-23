import requests

def download_file(url: str):
    file_path = "temp.pdf"

    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Failed to download file")

    with open(file_path, "wb") as f:
        f.write(response.content)

    return file_path