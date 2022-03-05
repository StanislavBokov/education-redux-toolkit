import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import configeureStore from './store/store';
import {titleChanged,taskDeleted, completeTask, getTasks, loadTasks, getTaskLoadingStatus, taskCreated} from "./store/task"

const store = configeureStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTaskLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(loadTasks())

  },[])

 
  const changeTitle = (taskId) => {
      dispatch(titleChanged(taskId))
  }
  const handleDelete = (taskId) => {
      dispatch(taskDeleted(taskId))
  }
  const createTask = () => {
    dispatch(taskCreated())
  }
  if(isLoading) {
    return <h1>Loading...</h1>
  }
  if(error) {
    return <p>{error}</p>
  }

      return (
        
        <>
          <h1>
              App
          </h1>
          <button onClick={createTask}>Create task</button>
          <ul>
            {state.map((e) => (
              <li key={e.id}>
                <p>{e.title}</p>
                <p>{`Completed: ${e.completed}`}</p>
                <div
                >
                <button onClick={()=> dispatch(completeTask(e.id))}>Complete</button>
                <button onClick={()=>changeTitle(e.id)}>ChangeTitle</button>
                <button onClick={()=>handleDelete(e.id)}>Delete</button>
                </div>
                <hr/>
              </li>
            ))}
          </ul>
            
        </>)
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

