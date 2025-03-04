const ChatMessageUser = ({ text }) => {
  return (
    <>
      <div className={'flex mb-4 max-w-[65%] justify-self-end'}>
        <div
          className={
            'max-w-72 md:max-w-64 rounded-lg px-4 py-2 break-all bg-mutedGray text-veryDarkGray'
          }
          style={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          <p className="break-normal leading-6">{text}</p>
        </div>
      </div>
    </>
  );
};

export default ChatMessageUser;
