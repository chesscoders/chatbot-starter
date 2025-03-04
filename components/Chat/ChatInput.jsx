const ChatInput = ({ userInput, setUserInput, handleSend, handleKeyDown }) => {
  return (
    <div className="flex items-center sm:mb-14 mb-6">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Scrie un mesaj..."
        className="px-4 py-3 rounded-lg bg-veryDarkGray border-softRed border-1 text-white placeholder-mutedGray focus:outline-none focus:ring-2 focus:ring-softRed resize-none"
      />
      <button onClick={handleSend} className="ml-2 px-4 py-2 h-full bg-softRed rounded-lg w-24">
        <i className="fa-light fa-paper-plane fa-2x text-veryDarkGray" />
      </button>
    </div>
  );
};

export default ChatInput;
