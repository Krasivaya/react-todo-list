import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { addItem } from "../redux/actions/todos";
import { nanoid } from "nanoid";
import cogoToast from "cogo-toast";
import "../styles/addItem.scss";

const AddItem = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const [validTitle, setValidTitle] = useState(false);
  const history = useHistory();

  const onChange = (e) => setTitle(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "") return setError(true);
    if (title.length < 4) return setValidTitle(true);

    dispatch(addItem({ id: nanoid(), title, isComplete: false }));

    setTitle("");
    history.push("/");

    const options = { position: "top-right" };
    cogoToast.success("The task has been created Successfully", options);
  };

  return (
    <div className="addItem">
      <form className="addItem__form" onSubmit={onSubmit}>
        <h3 className="addItem__form__header">Create a New Todo Task</h3>
        <Input
          type="text"
          className="addItem__form__input"
          placeholder="Add a new Todo Task..."
          value={title}
          onChange={onChange}
          error={error||validTitle}
        />
        {error && (
          <p className="addItem__form__input--error">Name is required</p>
        )}
        {validTitle && (
          <p className="addItem__form__input--error">Name should be 4 characters long</p>
        )}
        <button type="submit" className="addItem__form__btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddItem;
