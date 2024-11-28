// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
      <h1>Movie Database</h1>
      <div>
        <Link href="/" style={{ color: '#fff', marginRight: '10px' }}>Home</Link>
        <Link href="/movies" style={{ color: '#fff' }}>Movies</Link>
      </div>
    </nav>
  );
};

export default Navbar;
