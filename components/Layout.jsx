import { Menu, MenuButton, Profile } from '@components';

const Layout = ({ title, children, toggleComponent }) => {
  return (
    <div className="flex min-h-screen bg-veryDarkGray text-white font-body text-sm">
      <Menu toggleComponent={toggleComponent} />
      <main className="max w-full lg:col-span-5 px-4 pt-4 pb-12 lg:p-8 lg:pt-4 xl:px-12 gap-4">
        <div className="sm:mb-8 mb-4 flex items-center sticky top-0 z-10 bg-veryDarkGray p-4 -mx-4">
          <div className="flex flex-1 min-h-full">
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <Profile />
          <MenuButton />
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
