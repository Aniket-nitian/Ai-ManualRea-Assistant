const AudioControl = ({ audio }) => {
  if (!audio) return null;

  return (
    <div className="mt-4">
      <h3 className="text-blue-400 font-semibold">Audio Guide</h3>

      <audio
        controls
        className="w-full mt-2"
        src={`http://localhost:8001/${audio}`}
      />
    </div>
  );
};

export default AudioControl;
