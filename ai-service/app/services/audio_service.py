from gtts import gTTS
import uuid

def generate_audio(text: str):
    filename = f"audio_{uuid.uuid4()}.mp3"
    tts = gTTS(text)
    tts.save(filename)
    return filename