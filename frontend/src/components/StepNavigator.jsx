import { useState } from "react";

const StepNavigator = ({ data }) => {
  const [index, setIndex] = useState(0);

  const steps = data?.steps || [];

  if (!steps.length) return null;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg transition-all duration-300">
      <h2 className="text-xl text-blue-400 font-semibold mb-4">
        Step-by-Step Guide
      </h2>

      {/* STEP CARD */}
      <div className="bg-gray-800 p-4 rounded mb-4 shadow">
        <p className="text-gray-400">Step {index + 1}</p>
        <p className="text-lg mt-1">{steps[index]}</p>
      </div>

      {/* NAV BUTTONS */}
      <div className="flex gap-3 mb-4">
        <button
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          className="px-4 py-1 bg-gray-700 rounded hover:scale-105 transition"
        >
          Prev
        </button>

        <button
          disabled={index === steps.length - 1}
          onClick={() => setIndex(index + 1)}
          className="px-4 py-1 bg-green-500 rounded hover:scale-105 transition"
        >
          Next
        </button>
      </div>

      {/* WARNINGS */}
      {data.warnings?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-red-400 font-semibold">Warnings</h3>
          {data.warnings.map((w, i) => (
            <p key={i} className="text-red-300">
              ⚠️ {w}
            </p>
          ))}
        </div>
      )}

      {/* TROUBLESHOOTING */}
      {data.troubleshooting?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-yellow-400 font-semibold">Troubleshooting</h3>
          {data.troubleshooting.map((t, i) => (
            <p key={i}>🔧 {t}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepNavigator;
