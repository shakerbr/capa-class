import { Link } from 'react-router-dom';
import { isLoggedIn } from '../services/auth';

function Navbar() {
  return (
    <nav className='flex bg-[var(--color-text)] text-[var(--color-bg)] rounded-full justify-center gap-6 text-xl font-bold p-2 m-4'>
        <Link 
            to="/"
            className='transition-all duration-300 hover:underline' 
        >
            Home
        </Link>
        <Link 
            to="/about"
            className='transition-all duration-300 hover:underline' 
        >
            About
        </Link>
        <Link 
            to="/contact"
            className='transition-all duration-300 hover:underline' 
        >
            Contact
        </Link>
        {isLoggedIn() && (
        <Link 
            to="/dashboard"
            className='transition-all duration-300 hover:underline' 
        >
            Dashboard
        </Link>
        )}
        {!isLoggedIn() && (
        <Link 
            to="/login"
            className='transition-all duration-300 bg-blue-500 text-white px-4 rounded-full hover:bg-blue-700' 
        >
            Login
        </Link>
        )}
        {isLoggedIn() && (
        <Link 
            to="/logout"
            className='transition-all duration-300 bg-red-500 text-white px-4 rounded-full hover:bg-red-700' 
        >
            Logout
        </Link>
        )}
    </nav>
  );
}

export default Navbar;