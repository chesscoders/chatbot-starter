import ReactMarkdown from 'react-markdown';
import { DocumentModal } from '@components/Documents';
import { classnames } from '@lib';
import { useState } from 'react';

const ChatMessageBot = ({ context, isLoading, isStreaming, text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const responseStarted = typeof text === 'string' && text.length > 0;

  const contextToSource = ({ metadata, pageContent }) => ({
    text: pageContent,
    ...metadata,
  });

  const handleClick = () => {
    if (isStreaming) {
      return false;
    }

    if (context) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={classnames('flex mb-4 justify-self-start', !isStreaming && 'cursor-pointer')}
        onClick={handleClick}
      >
        <div
          className={
            'max-w-72 md:max-w-[800px] rounded-lg px-4 py-2 break-all text-white message-markdown prose'
          }
        >
          {/* If no text, we'll show loading as the message may be ready (non-loading) but just with context, no answer */}
          {isLoading && <p>{text}</p>}
          {responseStarted && <ReactMarkdown>{text}</ReactMarkdown>}
          {/* </p> */}
        </div>
      </div>
      {isModalOpen && (
        <DocumentModal {...contextToSource(context[0])} readOnly setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default ChatMessageBot;
