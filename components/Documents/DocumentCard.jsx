import { useState } from 'react';
import { DocumentCardBody, DocumentCardFooter, DocumentCardHeader, DocumentModal } from '.';

const DocumentCard = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        key={props._id}
        className="w-full max-w-md p-6 rounded-lg bg-darkGray shadow-lg transition-transform duration-300 hover:scale-105 relative"
      >
        <DocumentCardHeader {...props} showModal={() => setIsModalOpen(true)} />
        <DocumentCardBody text={props?.text} />
        <DocumentCardFooter setIsModalOpen={setIsModalOpen} source={props?.source} />
      </div>
      {isModalOpen && <DocumentModal {...props} setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default DocumentCard;
