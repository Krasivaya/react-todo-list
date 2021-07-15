import React from 'react';
import TodoItem from './TodoItem';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';

const TodoList = ({ todoList, setTodoList }) => {

  const deleteItem = todoId => {
    setTodoList([...todoList.filter(todo => todo.id !== todoId)])
    const options = { position: 'top-right' }
    cogoToast.success('Deleted Successfully', options)
  }


  const completeItem = index => {
    const newList = [...todoList]
    newList[index].isComplete = !newList[index].isComplete
    setTodoList(newList)
  }


  return (
    <div className="todoList">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <Link to='/new'><Button className="mb-4" circular primary >Create a New Task</Button></Link>
            {todoList.map((todo, index) =>
              <TodoItem
                key={todo.id}
                index={index}
                todo={todo}
                deleteItem={deleteItem}
                completeItem={completeItem}
                todoList={todoList}
                setTodoList={setTodoList}
              />
            )}
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  )
}

export default TodoList
