import { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.start();
    setListening(true);

    recognition.onresult = (e) => {
      setQuery(e.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 p-3 rounded bg-gray-800 text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask or speak..."
      />

      <button
        onClick={startListening}
        className={`px-3 ${listening ? "bg-red-500" : "bg-gray-600"}`}
      >
        🎤
      </button>

      <button
        onClick={() => {
          if (!query) return;
          onSend(query);
          setQuery("");
        }}
        className="bg-blue-500 px-4"
      >
        Ask
      </button>
    </div>
  );
};

export default ChatInput;
