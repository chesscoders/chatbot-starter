// ChatAvatar.jsx
import { useEffect, useRef } from 'react';
import StreamingAvatar, { TaskMode, TaskType } from '@heygen/streaming-avatar';

// A helper to fetch the access token (adjust as needed)
async function fetchAccessToken() {
  const response = await fetch(`${process.env.API_BASE_URL}/admin/avatar/get-access-token`, {
    method: 'POST',
  });
  return await response.text();
}

const ChatAvatar = ({ messages }) => {
  const avatarRef = useRef(null);
  const lastBotMessage = messages.filter((m) => m.sender === 'bot').pop();

  useEffect(() => {
    // Initialize the avatar session once
    async function initAvatar() {
      const token = await fetchAccessToken();
      avatarRef.current = new StreamingAvatar({ token });
      // Optionally attach event listeners
      avatarRef.current.on('STREAM_READY', (event) => {
        console.log('Avatar stream ready:', event.detail);
      });
    }
    initAvatar();

    // Clean up on unmount
    return () => {
      avatarRef.current?.stopAvatar();
    };
  }, []);

  useEffect(() => {
    // When a new bot answer is available, have the avatar speak it.
    if (lastBotMessage && lastBotMessage.text && avatarRef.current) {
      avatarRef.current
        .speak({ text: lastBotMessage.text, taskType: TaskType.REPEAT, taskMode: TaskMode.SYNC })
        .catch((error) => console.error('Avatar speak error:', error));
    }
  }, [lastBotMessage]);

  return (
    <div className="relative">
      {/* Optionally, render a video element if you want to show the avatar */}
      <video
        id="avatar-video"
        autoPlay
        playsInline
        className="w-full h-auto rounded-lg"
        // If the avatar API provides a MediaStream, attach it here.
      />
      <p className="mt-2 text-center text-sm italic">Your answer will be read out by the avatar.</p>
    </div>
  );
};

export default ChatAvatar;
