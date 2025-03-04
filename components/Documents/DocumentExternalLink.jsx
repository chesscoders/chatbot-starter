const DocumentExternalLink = ({ url }) => {
  if (!url) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-softRed transition-colors duration-200 hover:scale-105"
      aria-label="Open External Link"
    >
      <i className="fa-light fa-external-link-alt fa-lg" />
    </a>
  );
};

export default DocumentExternalLink;
