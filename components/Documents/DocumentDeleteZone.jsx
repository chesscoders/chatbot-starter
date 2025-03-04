import { deleteDocument } from '@api/document';
import { Button } from '@components';
import { router, toaster } from '@lib';
import { useState } from 'react';

const DocumentDeleteZone = ({ id, setIsModalOpen }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteDocument(id);
      toaster.success('Success! Item was removed.');
      setIsModalOpen(false);
      router.reload();
    } catch (err) {
      console.error(err);
      toaster.error('Error! Please try again later');
    }
  };

  return (
    <>
      {!showConfirm && (
        <Button
          className="button full bg-softRed border-none float-right w-48"
          onClick={() => setShowConfirm(true)}
        >
          <i className="fa-solid fa-trash-can mr-2" />
          Delete Entry
        </Button>
      )}
      {showConfirm && (
        <div className="flex justify-between items-center">
          <p>
            <span className="text-softRed font-bold">Danger Zone!</span> Are you sure?
          </p>
          {/* Using row reverse to prevent accidental double clicking on the delete button */}
          <div className="flex gap-4 flex-row-reverse">
            <Button
              className="button full bg-veryDarkGray border-none w-48"
              onClick={() => setShowConfirm(false)}
            >
              <i className="fa-solid fa-arrow-left mr-2" />
              Back
            </Button>
            <Button className="button full bg-softRed border-none w-48" onClick={handleDelete}>
              <i className="fa-solid fa-trash-can mr-2" />
              Confirm Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentDeleteZone;
