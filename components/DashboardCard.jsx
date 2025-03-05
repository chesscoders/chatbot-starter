import { Link } from '@components';

const DashboardCard = ({ href, icon, title, description }) => (
  <Link
    href={href}
    className="group w-full p-8 rounded-lg bg-darkGray shadow-lg transform transition-transform duration-300 hover:scale-105"
  >
    <div className="flex flex-col items-center text-center">
      {/* Circle Background for Icon */}
      <div className="w-32 h-32 flex items-center justify-center rounded-full bg-veryDarkGray mb-4 transition-colors duration-300 group-hover:bg-secondary">
        <i
          className={`${icon} text-6xl text-secondary transition-colors duration-300 group-hover:text-veryDarkGray`}
        ></i>
      </div>
      <h3 className="text-xl font-bold text-mutedGray mb-2">{title}</h3>
      <p className="text-mutedGray">{description}</p>
    </div>
  </Link>
);

export default DashboardCard;
