import { DocumentExternalLink } from '.';

const DocumentCardFooter = ({ setIsModalOpen, source }) => {
  return (
    <>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-secondary transition-colors duration-200 hover:scale-105"
          aria-label="View Details"
        >
          <i className="fa-light fa-eye fa-lg" />
        </button>

        <DocumentExternalLink url={source} />
      </div>
    </>
  );
};

export default DocumentCardFooter;
