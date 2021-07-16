import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../styles/index.scss";

const TodoList = () => {
  const { items: todoList } = useSelector(({ todos }) => todos);
  return (
    <div className="todo">
      <div className="todo__list">
        <Link to="/new">
          <Button className="todo__list__btn" circular primary>
            Create a New Task
          </Button>
        </Link>
        {todoList.map((todo, index) => (
          <TodoItem key={todo.id} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
