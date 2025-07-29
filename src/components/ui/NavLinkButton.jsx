import { Link } from 'react-router-dom';

export default function NavLinkButton({ to, children }) {
  return (
    <Link
      to={to}
      className="py-2 bg-transparent text-white hover:bg-gray-300 transition-colors 
      xl:bg-gray-700 sm:hover:bg-gray-300 sm:hover:text-gray-700 sm:py-2 sm:px-4 sm:rounded"
    >
      {children}
    </Link>
  );
}
