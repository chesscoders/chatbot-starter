import { ProfileMenu } from '@components';
import { useDisclosure, useOnClickOutside } from '@hooks';
import { useRef } from 'react';

const Profile = () => {
  const { isOpen, hide, toggle } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div ref={ref} className="relative flex items-center gap-4">
      <div
        className="hidden cursor-pointer items-center space-x-2 md:flex"
        onClick={toggle}
        role="button"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            <img src="https://jucatorul.ro/wp-content/uploads/2022/12/superbet-logo-cerc-1.png" />
          </div>
        </div>
        {isOpen ? (
          <i className="fas fa-chevron-up text-softRed"></i>
        ) : (
          <i className="fas fa-chevron-down text-softRed"></i>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-12 right-2 z-50 rounded-lg bg-darkGray text-white shadow-xl">
          <ProfileMenu />
        </div>
      )}
    </div>
  );
};

export default Profile;
