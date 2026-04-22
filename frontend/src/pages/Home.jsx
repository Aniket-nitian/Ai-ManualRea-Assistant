import { useState } from "react";
import ChatInput from "../components/ChatInput";
import StepNavigator from "../components/StepNavigator";
import AudioControl from "../components/AudioControl";
import { useChat } from "../hooks/useChat";

const Home = () => {
  const { sendQuery, loading, response } = useChat();
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-linear-to-br from-black to-gray-900 text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🤖 AI Manual Trainer</h1>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* INPUT */}
      <ChatInput onSend={(q) => sendQuery(q, language)} />

      {loading && <p className="mt-4">Thinking...</p>}

      {/* OUTPUT */}
      {response && (
        <div className="mt-6">
          <StepNavigator data={response.data} />
          <AudioControl audio={response.audio} />
        </div>
      )}
    </div>
  );
};

export default Home;
