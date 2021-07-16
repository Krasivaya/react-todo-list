import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import cogoToast from "cogo-toast";
import "../styles/todoItem.scss";
import {
  deleteItem,
  updateItem,
  updateItemStatus,
} from "../redux/actions/todos";

const TodoItem = ({ index }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const [validTitle, setValidTitle] = useState(false);
  const dispatch = useDispatch();
  const { items: todoList } = useSelector(({ todos }) => todos);

  const todo = todoList[index];

  const checkItem = () => {
    return todo.isComplete ? "checked" : "";
  };

  const markItem = () => {
    return {
      textDecoration: todo.isComplete ? "line-through" : "none",
    };
  };
  const onChange = (e) => setTitle(e.target.value);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));

    const options = { position: "top-right" };
    cogoToast.success("The task has been deleted Successfully", options);
  };

  const handleStatus = (index) => {
    dispatch(updateItemStatus(index));

    const options = { position: "top-right" };
    cogoToast.success(
      `The task has been ${todo.isComplete ? "completed" : "uncompleted"}`,
      options
    );
  };

  const onEdit = () => {
    if (title === "") return setError(true);
    if (title.length < 4) return setValidTitle(true);
    dispatch(
      updateItem({ id: todo.id, index, title, status: todo.isComplete })
    );
    setOpenEditModal(false);
    setTitle("");
    const options = { position: "top-right" };
    cogoToast.success("The task has been updated", options);
  };

  return (
    <div className="todoItem">
      <div className="todoItem__title">
        <input
          className="todoItem__title__input"
          onChange={() => {
            handleStatus(index);
          }}
          type="checkbox"
          checked={checkItem()}
        />

        <h5 style={markItem()}>{todo.title}</h5>
      </div>

      <div className="todoItem__btn">
        <button
          className="todoItem__btn--edit"
          onClick={() => setOpenEditModal(true)}
        >
          <Icon name="pencil alternate" />
        </button>

        <button
          className="todoItem__btn--delete"
          onClick={() => setOpenDeleteModal(true)}
        >
          <Icon name="trash" />
        </button>
      </div>

      {/* Delete Modal  */}
      <Modal
        size="mini"
        open={openDeleteModal}
        className="todoItem__modal"
        onClose={() => setOpenDeleteModal(false)}
      >
        <Modal.Header>Delete a Todo Task</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete <b> "{todo.title}" </b>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpenDeleteModal(false)}>
            No
          </Button>
          <Button
            positive
            onClick={() => {
              setOpenDeleteModal(false);
              handleDelete(todo.id);
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Edit Modal  */}
      <Modal
        size="mini"
        open={openEditModal}
        className="todoItem__modal"
        onClose={() => setOpenEditModal(false)}
      >
        <Modal.Header>Update a Todo Task</Modal.Header>
        <Modal.Content>
          <h5>
            Name:{" "}
            <Input
              placeholder="Edit Todo..."
              defaultValue={todo.title}
              onChange={onChange}
              error={error||validTitle}
            />
          </h5>
          {error && (
            <p className="addItem__form__input--error">Name is required</p>
          )}
          {validTitle && (
            <p className="addItem__form__input--error">
              Name should be 4 characters long
            </p>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpenEditModal(false)}>
            No
          </Button>
          <Button
            positive
            onClick={() => {
              onEdit();
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
