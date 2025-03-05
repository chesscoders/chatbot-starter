import { useEffect } from 'react';
import DocumentDeleteZone from './DocumentDeleteZone';

const DocumentModal = ({ _id, title, tag, text, setIsModalOpen, readOnly }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-darkGray rounded-lg p-8 w-full max-w-2xl relative max-h-[90vh] overflow-hidden">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <span className="bg-veryDarkGray text-secondary rounded-full px-3 py-1 text-xs font-semibold mb-4 inline-block">
          #{tag}
        </span>

        <div className="text-mutedGray text-sm mb-6 space-y-2 overflow-y-auto max-h-[60vh] pr-2">
          {text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        {!readOnly && <DocumentDeleteZone id={_id} setIsModalOpen={setIsModalOpen} />}

        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-secondary text-lg font-bold"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default DocumentModal;
