import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='flex block border-2 rounded-full justify-center gap-6 text-xl font-bold p-2 m-4'>
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
        <Link 
            to="/login"
            className='transition-all duration-300 hover:underline' 
        >
            Login
        </Link>
    </nav>
  );
}

export default Navbar;