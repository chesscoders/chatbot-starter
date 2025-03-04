import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
} from '@heygen/streaming-avatar';
import { useEffect, useRef, useState } from 'react';

import { store } from '@auth';
import { Button } from '@components';

export default function InteractiveAvatar({ messages }) {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [stream, setStream] = useState();
  const [data, setData] = useState('');
  const mediaStream = useRef(null);
  const avatar = useRef(null);

  // Refs for buffering streaming text
  const textBufferRef = useRef('');
  const lastProcessedRef = useRef('');

  async function fetchAccessToken() {
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/admin/avatar/get-access-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.getState()}`,
        },
      });
      const { token } = await response.json();
      return token;
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
    return '';
  }

  async function startSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();

    avatar.current = new StreamingAvatar({
      token: newToken,
    });
    avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
      console.log('Avatar started talking', e);
    });
    avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
      console.log('Avatar stopped talking', e);
    });
    avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      console.log('Stream disconnected');
      endSession();
    });
    avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
      console.log('>>>>> Stream ready:', event.detail);
      setStream(event.detail);
    });

    try {
      const res = await avatar.current.createStartAvatar({
        quality: AvatarQuality.Low,
        avatarName: 'Tyler-incasualsuit-20220721',
        knowledgeId: '', // Or use a custom `knowledgeBase`.
        voice: {
          rate: 1.5,
          emotion: VoiceEmotion.SOOTHING,
        },
        language: 'ro',
        disableIdleTimeout: true,
        video_encoding: 'VP8',
      });
      setData(res);
    } catch (error) {
      console.error('Error starting avatar session:', error);
    } finally {
      setIsLoadingSession(false);
    }
  }

  // Process new streaming text by buffering and splitting it into complete sentences.
  const processStreamingText = (newText) => {
    // Compute the new delta (portion not yet processed)
    const previousText = lastProcessedRef.current;
    const delta = newText.substring(previousText.length);
    lastProcessedRef.current = newText;
    if (!delta) return;

    // Append delta to our buffer
    textBufferRef.current += delta;

    // Split the buffer at sentence boundaries (period, exclamation or question mark followed by whitespace)
    const sentences = textBufferRef.current.split(/(?<=[.!?])\s+/);
    // The last element might be incomplete; put it back in the buffer
    textBufferRef.current = sentences.pop() || '';

    // Speak each complete sentence asynchronously
    sentences.forEach((sentence) => {
      if (sentence.trim().length > 0 && avatar.current) {
        avatar.current
          .speak({
            text: sentence,
            taskType: TaskType.REPEAT,
            taskMode: TaskMode.ASYNC,
          })
          .catch((err) => console.log(err.message));
      }
    });
  };

  // When messages updates, if the length is even then the last message is a response.
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    if (lastMessage.sender === 'user') {
      // A new question has been sent, so clear any previous buffered text.
      textBufferRef.current = '';
      lastProcessedRef.current = '';
    } else if (lastMessage.sender === 'bot') {
      // Process the bot's answer as it streams in.
      const currentAnswer = lastMessage.text;
      processStreamingText(currentAnswer);
    }
  }, [messages]);

  async function handleInterrupt() {
    if (!avatar.current) {
      console.log('Avatar API not initialized');
      return;
    }
    try {
      textBufferRef.current = '';
      lastProcessedRef.current = '';
      await avatar.current.interrupt();
    } catch (e) {
      console.log(e.message);
    }
  }

  async function endSession() {
    textBufferRef.current = '';
    lastProcessedRef.current = '';
    await avatar.current?.stopAvatar();
    setStream(undefined);
  }

  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current.play();
        console.log('Playing');
      };
    }
  }, [stream]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <div className="h-[500px] flex flex-col justify-center items-center">
          {stream ? (
            <div className="sm:h-[500px] w-full sm:w-[900px] w-full justify-center items-center flex sm:flex-row flex-col rounded-lg overflow-hidden">
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              >
                <track kind="captions" />
              </video>
              <div className="flex sm:flex-col flex-row gap-2 sm:absolute block bottom-50 right-20 sm:mt-0 mt-3 sm:w-fit w-full">
                <Button
                  className="border-1 border-stone-500 text-white p-2 px-6 rounded-lg whitespace-nowrap sm:w-32 w-1/2"
                  size="md"
                  variant="shadow"
                  onClick={handleInterrupt}
                >
                  Interrupt
                </Button>
                <Button
                  className="border-1 border-stone-500 text-white p-2 px-6 rounded-lg whitespace-nowrap sm:w-32 w-1/2"
                  size="md"
                  variant="shadow"
                  onClick={endSession}
                >
                  End session
                </Button>
              </div>
            </div>
          ) : !isLoadingSession ? (
            <div className="h-full justify-center items-center flex flex-col gap-8 sm:w-[500px] w-full self-center">
              <Button
                className="border-1 border-stone-500 text-white p-2 px-12 rounded-lg"
                size="md"
                variant="shadow"
                onClick={startSession}
              >
                Start session
              </Button>
            </div>
          ) : (
            <div className="h-full justify-center items-center flex flex-col gap-8 w-[500px] self-center">
              <Button
                className="border-1 border-stone-500 text-white p-2 px-12 rounded-lg"
                size="md"
                variant="shadow"
                disabled
              >
                Loading session...
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
