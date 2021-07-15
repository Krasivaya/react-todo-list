import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.scss';

const Navbar = ({ todoList }) => {
  return (
    <nav className="navbar">
      <Link className="navbar__brand" to="/">
        Todo App
        <span class="badge badge-primary badge-pill ml-2">
          {todoList.filter(todo => todo.isComplete === false).length}
        </span>
      </Link>
    </nav>
  )
}

export default Navbar 
