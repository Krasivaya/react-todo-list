import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TodoList = () => {
  const { items: todoList } = useSelector(({ todos }) => todos);
  return (
    <div className="todoList">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <Link to="/new">
              <Button className="mb-4" circular primary>
                Create a New Task
              </Button>
            </Link>
            {todoList.map((todo, index) => (
              <TodoItem key={todo.id} index={index} />
            ))}
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
