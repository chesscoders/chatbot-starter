import { Link, Pages } from '@components';
import { useSwipeable } from '@hooks';

const Menu = ({ toggleComponent }) => {
  const { inputRef, navRef, onTouchStart, onTouchMove, onTouchEnd } = useSwipeable();

  return (
    <>
      <input type="checkbox" id="menu" className="hidden" ref={inputRef} />
      <label
        htmlFor="menu"
        className="backdrop fixed inset-0 h-screen w-screen bg-gray-300 lg:hidden"
      />
      <nav
        className="nav-menu border-r border-darkGray bg-darkGray text-white"
        ref={navRef}
        onTouchStart={(e) => onTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => onTouchMove(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <div className="h-screen flex flex-col lg:sticky lg:top-0 justify-between overflow-y-auto">
          <div className="flex flex-col py-8">
            <Link href="/admin" className="hover:text-white">
              <div className="px-4">
                <h1 className="mb-12 text-2xl">ChatBot Starter</h1>
              </div>
            </Link>
            <Pages />
          </div>
          <div className="block sm:hidden px-5 mb-32">{toggleComponent}</div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
