import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addItem } from "../redux/actions/todos";
import { nanoid } from "nanoid";
import cogoToast from "cogo-toast";

const AddItem = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const onChange = (e) => setTitle(e.target.value);

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addItem({ id: nanoid(), title, isComplete: false }));

    setTitle("");
    history.push("/");

    const options = { position: "top-right" };
    cogoToast.success("The task has been created Successfully", options);
  };

  return (
    <div className="addItem">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={onSubmit}>
              <h3 className="addItem__header">Create a New Todo Task</h3>
              <input
                type="text"
                className="addItem__input form-control"
                placeholder="Add a new Todo Task..."
                value={title}
                onChange={onChange}
              />
              <button type="submit" className="addItem__btn btn btn-primary">
                Add
              </button>
            </form>
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
