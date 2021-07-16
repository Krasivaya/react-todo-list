import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/navbar.scss';

const Navbar = () => {
  const { items: todoList } = useSelector(({ todos }) => todos);
  return (
    <nav className="navbar">
      <Link className="navbar__brand" to="/">
        Todo App
        <span className="navbar__brand__badge">
          {todoList.filter(todo => todo.isComplete === false).length}
        </span>
      </Link>
    </nav>
  )
}

export default Navbar 
