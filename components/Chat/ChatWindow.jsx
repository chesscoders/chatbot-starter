/**
 * Streaming mode is not straightforward for a RAG chain with sources.
 * The context attachment step in the RAG chain breaks the stream.
 * As such, the API indicates the end of the stream by sending specific events.
 * We are gracefully handling receiving the context here and attaching it to the message.
 */

import { store } from '@auth';
import { classnames, toaster } from '@lib';
import { useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

import { InteractiveAvatar } from '@components/Avatar';

const ChatWindow = ({ onClose, isShortAnswer }) => {
  // Existing states…
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isStreaming, setStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  // New state: choose between text and avatar output.
  const [chatMode, setChatMode] = useState('text'); // 'text' or 'avatar'

  // ... your handleSend remains largely the same.
  // When streaming the answer, update messages as before.
  // (We’ll later pass the answer text to the avatar component if needed.)

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { text: userInput, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput('');

    try {
      setLoading(true);
      const response = await fetch(`${process.env.API_BASE_URL}/admin/chat/chat-rag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: `Bearer ${store.getState()}`,
        },
        body: JSON.stringify({
          question: newMessage.text,
          streamMode: true,
          isShortAnswer,
        }),
      });
      if (!response.body) {
        console.error('ReadableStream not supported in this browser.');
        setLoading(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let buffer = '';
      let done = false;

      // Add an empty bot message to display the streaming response
      setLoading(false);
      setMessages((prev) => [...prev, { text: '', sender: 'bot' }]);

      setStreaming(true);
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value || new Uint8Array(), { stream: true });
        if (chunk) {
          buffer += chunk;
          let index;
          while ((index = buffer.indexOf('\n\n')) >= 0) {
            const rawMessage = buffer.slice(0, index);
            buffer = buffer.slice(index + 2);
            const lines = rawMessage.split('\n');
            let event = null;
            let data = '';
            for (const line of lines) {
              if (line.startsWith('event:')) {
                event = line.slice(6).trim();
              } else if (line.startsWith('data:')) {
                data += line.slice(5).trim();
              }
            }
            if (event === 'answer') {
              const text = JSON.parse(data);
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].text += text;
                return updated;
              });
            } else if (event === 'context') {
              const context = JSON.parse(data);
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].context = context;
                return updated;
              });
            } else if (event === 'end') {
              done = true;
              break;
            } else if (event === 'error') {
              console.error('Error from server:', JSON.parse(data));
              toaster.error('Error from server');
              done = true;
              break;
            }
          }
        }
      }
      setStreaming(false);
    } catch (error) {
      console.error('Error while streaming:', error);
      toaster.error('Error while streaming');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-full">
      {messages.length === 0 && <ChatHeader onClose={onClose} />}
      <div className="w-full flex gap-4 text-base mt-4">
        <div
          className={classnames(
            'p-1 cursor-pointer',
            chatMode === 'text' && 'border-b-2 border-white transition delay-300'
          )}
          onClick={() => setChatMode('text')}
        >
          Text
        </div>
        <div
          className={classnames(
            'p-1 cursor-pointer relative',
            chatMode === 'avatar' && 'border-b-2 border-white'
          )}
          onClick={() => setChatMode('avatar')}
        >
          Avatar{' '}
          <sup className=" absolute bg-softRed  text-[8px] rounded-full p-1.5 pb-2 top-0 -right-3">
            New
          </sup>
        </div>
      </div>
      <div className="flex-1">
        {chatMode === 'text' ? (
          <ChatMessages {...{ isLoading, isStreaming, messages, messagesEndRef }} />
        ) : (
          <InteractiveAvatar messages={messages} />
        )}
      </div>
      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ChatWindow;
