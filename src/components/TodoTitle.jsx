import React, { useState } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import '../styles/index.scss';

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

const TodoTitle = ({ todo, editItem }) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state

  const markItem = () => {
    return { 
      textDecoration: todo.isComplete ? 'line-through' : 'none' 
    }
  }

  const [ title, setTitle ] = useState('');

  const onChange = e => setTitle(e.target.value)

  const onEdit = () => {
    editItem(todo.id, title, todo.isComplete)
    setTitle('')
  }

  return (
    <div className="todoTitle">
      <h5 
        style={markItem()}
        onClick={() => dispatch({ type: 'open', size: 'mini' })}
      >{todo.title}</h5>


      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>Edit Todo</Modal.Header>
        <Modal.Content>
          <h5>Name: <Input placeholder='Edit Todo...' value={title} onChange={onChange} /></h5>
          
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            No
          </Button>
          <Button 
            positive onClick={() => { 
              dispatch({ type: 'close' }) 
              onEdit()
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default TodoTitle
