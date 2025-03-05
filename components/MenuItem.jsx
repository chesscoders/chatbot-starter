import { Link } from '@components';
import { classnames } from '@lib';
import { useRouter } from 'next/router';

const MenuItem = ({ href, icon, children, level = 1 }) => {
  const router = useRouter();
  const { pathname } = router;

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={classnames(
        'menu-item cursor-pointer px-4 py-1 hover:bg-secondary hover:text-darkGray text-base leading-normal',
        'no-underline',
        level == 1 ? 'pl-4' : 'pl-8',
        isActive && 'font-semibold bg-secondary text-darkGray'
      )}
    >
      <div className="flex">
        <div className="mr-2 w-10 flex justify-center items-center">
          <i className={icon} />
        </div>
        {children}
      </div>
    </Link>
  );
};

export default MenuItem;
