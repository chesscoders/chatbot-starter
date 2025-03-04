import ChatMessageUser from './ChatMessageUser';
import ChatMessageBot from './ChatMessageBot';

const ChatMessage = ({ sender, ...props }) => {
  if (!sender) {
    return null;
  }

  if (sender === 'bot') {
    return <ChatMessageBot {...props} />;
  }

  return <ChatMessageUser {...props} />;
};

export default ChatMessage;
