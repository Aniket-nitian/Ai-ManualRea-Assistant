import requests

def download_file(url: str, save_path: str):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers, stream=True, allow_redirects=True)

    if response.status_code != 200:
        raise Exception(f"Download failed: {response.status_code}")

    with open(save_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)