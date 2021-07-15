import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import TodoTitle from "./TodoTitle";
import cogoToast from "cogo-toast";
import "../styles/todoItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItemStatus } from "../redux/actions/todos";

const exampleReducer = (state, action) => {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
};

const TodoItem = ({ index }) => {
  const todoDispatch = useDispatch();
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const { items: todoList } = useSelector(({ todos }) => todos);

  const todo = todoList[index];

  const checkItem = () => {
    return todo.isComplete ? "checked" : "";
  };

  const handleDelete = (id) => {
    todoDispatch(deleteItem(id));

    const options = { position: "top-right" };
    cogoToast.success("The task has been deleted Successfully", options);
  };

  const handleStatus = (index) => {
    todoDispatch(updateItemStatus(index));

    const options = { position: "top-right" };
    cogoToast.success(`The task has been ${todo.isComplete ? 'completed': 'uncompleted'}`, options);
  };

  return (
    <div className="todoItem">
      <button
        className=" todoItem__btn btn btn-danger"
        onClick={() => dispatch({ type: "open", size: "mini" })}
      >
        <Icon name="trash" />
      </button>
      <input
        className="float-left mt-2 mr-2"
        onChange={() => {
          handleStatus(index);
        }}
        type="checkbox"
        checked={checkItem()}
      />
      <TodoTitle index={index} />

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>Delete a Todo Task</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete <b> "{todo.title}" </b>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button
            positive
            onClick={() => {
              dispatch({ type: "close" });
              handleDelete(todo.id);
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default TodoItem;
