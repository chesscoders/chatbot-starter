import { MenuItem } from '@components';

const Pages = () => {
  return (
    <>
      <p className="px-4 text-lg mb-1 text-mutedGray">Chat</p>
      <MenuItem href="/admin/chat" icon="fa-light fa-robot" level="1">
        Chat
      </MenuItem>
      <MenuItem href="/admin/knowledge-feed" icon="fa-light fa-book" level="1">
        Knowledge Feed
      </MenuItem>
      <br />
      <br />
      <p className="px-4 text-lg mb-1 text-mutedGray">Knowledge Base</p>
      <MenuItem href="/admin/faq-base" icon="fa-light fa-comments-question-check" level="1">
        FAQ Base
      </MenuItem>
    </>
  );
};

export default Pages;
