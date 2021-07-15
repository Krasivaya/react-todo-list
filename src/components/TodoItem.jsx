import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import TodoTitle from './TodoTitle';
import cogoToast from 'cogo-toast';
import '../styles/todoItem.scss';

const exampleReducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

const TodoItem = ({ index, todo, deleteItem, completeItem, todoList, setTodoList}) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  const checkItem = () => {
    return todo.isComplete ? "checked" : ""
  }

  const editItem = (todoId, title, status) => {
    const newList = [...todoList.filter(todo => todo.id === todoId)]
    newList[0] = {
        id: todoId,
        title: title,
        isComplete: status,
      }
    setTodoList(todoList.map(obj => newList.find(o => o.id === obj.id) || obj))
    const options = {position:'top-right'}
    cogoToast.success('The task has been updated', options)
  }

  return (
    <div className="todoItem">

{/* <div className="">
        <button 
        style={removeBtn()} 
        onClick={() => doneTodo(index)} 
        className="btn btn-success btn-sm float-right">
          <span role="img" aria-label="">✅</span></button>
        <button 
          onClick={() => delTodo(todo.id)} 
          className="btn btn-danger btn-sm float-right mr-1"
        >x</button> */}
        {/* <input className="float-left mt-2 mr-2" type="checkbox" onChange={() => doneTodo(index)}/> */}
      <button
        className=" todoItem__btn btn btn-danger"
        onClick={() => dispatch({ type: 'open', size: 'mini' })} 
      ><Icon name='trash'/></button>
      <input 
        className="float-left mt-2 mr-2"
        onChange={() => {  
          completeItem(index)
        }} 
        type="checkbox" checked={checkItem()}
      />
      <TodoTitle 
        todo={todo} 
        editItem={editItem}
      />


      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Delete a Todo Task</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete <b> "{todo.title}" </b></p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            No
          </Button>
          <Button 
            positive onClick={() => { 
              dispatch({ type: 'close' }) 
              deleteItem(todo.id) 
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default TodoItem 
