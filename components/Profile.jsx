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
          <div className="w-10 h-10 rounded-full flex justify-center items-center bg-secondary">
            <i className="text-lg text-white fas fa-user"></i>
          </div>
        </div>
        {isOpen ? (
          <i className="fas fa-chevron-up text-secondary"></i>
        ) : (
          <i className="fas fa-chevron-down text-secondary"></i>
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
