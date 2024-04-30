import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NavHead: FC = () => {
  return (
    <header>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-12 w-auto"
                  src="/images/kanon-gaming100x60-01-1.png"
                  alt="Kanon Gaming"
                />
                <img
                  className="hidden lg:block h-12 w-auto"
                  src="/images/kanon-gaming100x60-01-1.png"
                  alt="Kanon Gaming"
                />
              </div>
            </div>
            <div className="sm:ml-6">
              <div className="flex lg:space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Game List</Link>
                <Link to="/slot-machine" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Slot Machine</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};