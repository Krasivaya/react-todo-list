import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddItem from './components/AddItem';
import cogoToast from 'cogo-toast';
import Navbar from './components/constants/Navbar';

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: 'Learn React Component and Hooks',
      isComplete: true,
    },
    {
      id: 2,
      title: 'Build a Todo List',
      isComplete: true,
    },
    {
      id: 3,
      title: 'Learn React Router',
      isComplete: false,
    },
    {
      id: 4,
      title: 'Learn React Semantic UI',
      isComplete: false,
    },
    {
      id: 5,
      title: 'Learn Sass',
      isComplete: false,
    },
    {
      id: 6,
      title: 'Restructure Todo List in BEM Structure',
      isComplete: false,
    },
  ])

  const addItem = (todoId, title) => {
    const newItem = {
      id: (todoId + 1),
      title: title,
      isComplete: false,
    }
    setTodoList([...todoList, newItem])
    
    const options = {position:'top-right'}
    cogoToast.success('Created Successfully', options)
  }
  
  return (
    <div className="App">
    <Router>
      <Navbar todoList={todoList} />
      <Switch>
        <Route path='/new'>
          <AddItem
            todoList={todoList}
            setTodoList={setTodoList}
            addItem={addItem}
          />
        </Route>
        <Route exact path='/'>
          <TodoList
            todoList={todoList}
            setTodoList={setTodoList}
          />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
