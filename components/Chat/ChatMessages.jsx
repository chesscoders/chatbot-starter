import { Loading } from '@components';
import ChatMessage from './ChatMessage';

const ChatMessages = ({ isLoading, messages, messagesEndRef, isStreaming }) => {
  return (
    <div className="flex-grow overflow-y-auto my-4">
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          text={msg.text}
          sender={msg.sender}
          context={msg.context}
          isStreaming={isStreaming}
        />
      ))}
      {isLoading && (
        <ChatMessage key="message-loading" text={<Loading />} isLoading={isLoading} sender="bot" />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
