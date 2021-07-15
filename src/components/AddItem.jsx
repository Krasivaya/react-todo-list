import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddItem = ({ todoList, addItem }) => {

  const [ title, setTitle ] = useState('');

  const onChange = e => setTitle(e.target.value)
  
  const id = todoList.map(todo => todo.id)

  let history = useHistory();

  const onSubmit = e => {
    e.preventDefault()
    addItem(id, title)
    setTitle('')
    history.push('/')
  }

  return (
    <div className="addItem">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={onSubmit}>
              <h3 className="addItem__header">Create a New Todo Task</h3>
              <input 
                type="text"
                class="addItem__input form-control"
                placeholder="Add a new Todo Task..."
                value={title}
                onChange={onChange}
              />
              <button type="submit" className="addItem__btn btn btn-primary">Add</button>
            </form>
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </div>
  )
}

export default AddItem
