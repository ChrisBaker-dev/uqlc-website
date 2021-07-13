import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/events'>Events</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/login'>Log in</Link>
        <Link to='/signup'>Sign up</Link>
    </nav>
  );
}
