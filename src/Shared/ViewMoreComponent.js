import React, { useState, useCallback, useRef } from 'react';
import './ViewMoreComponent.css';

const SLICE_LIMIT = 100;

const ViewMore = React.memo(({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dialogRef = useRef(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    dialogRef.current.showModal();
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    dialogRef.current.close();
  }, []);

  const showViewMore = text && text.length > SLICE_LIMIT;
  const truncatedText = showViewMore
    ? text.slice(0, SLICE_LIMIT) + '... '
    : text;

  return (
    <>
      <p>
        {truncatedText}
        {showViewMore && (
          <span className='view-more' onClick={openModal}>
            View More
          </span>
        )}
      </p>
      <dialog
        ref={dialogRef}
        className='modal'
        open={isModalOpen}
        onClose={closeModal}
      >
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <p>{text}</p>
        </div>
      </dialog>
    </>
  );
});

export default ViewMore;
