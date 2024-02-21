import 'bootstrap/dist/css/bootstrap.min.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faPen,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import './App.css';
import React, { useState} from 'react';
import { Fragment } from 'react';

function App() {
  // task todo list 
  const [todo,setTodo]=useState([
    {"id":1,"title":"task1","status":false},
    {"id":2,"title":"task2","status":false}
  ])

  // temp state 
  const[newTask,setNewTask]=useState('')
  const[updateData,setUpdateData]=useState('')

  // add task 
  const addTask=()=>{
   if (newTask) {
    let num=todo.length+1
    let newEntry={id:num,title:newTask,status:false}
    setTodo([...todo,newEntry])
    setNewTask('')
   }
  }

  // delete task 
  const deletetask=(id)=>{
    let newTask =todo.filter(task=>task.id !== id)
    setTodo(newTask)
  }

  // mark done task as completed 
  const markDone=(id)=>{
     let newTask = todo.map(task=>{
      if (task.id===id) {
        return({...task,status: !task.status})
      }
      return task;
     })
     setTodo(newTask)
  }

  // cancel update 
  const cancelUpdate=()=>{

  }

  // change task for update 
  const changetask=(e)=>{
   let newEntry={
    id: updateData.id,
    title:e.target.value,
    status:updateData.status ? true:false
   }
   setUpdateData(newEntry)
  }

  const updatetask=()=>{
   let filterRecords=[...todo].filter(task=>task.id !== updateData.id)
   let updateObject= [...filterRecords,updateData]
  }
  return (
    <div className="container App">
      <br/><br/>
      <h2>To Do App</h2>
      <br/><br/>

      {/* add task  */}
       <div className='row my-4'>
        <div className='col'>
          <input className='form-control form-control-lg' value={newTask} onChange={(e)=>setNewTask(e.target.value)}/>
        </div>
        <div className='col-auto'>
          <button className='btn btn-lg btn-success' onClick={addTask}>Add Task</button>
        </div>
       </div>
 
       {/* update task  */}
       <div className='row my-3'>
        <div className='col'>
          <input value={updateData && updateData.title} onChange={(e)=>changetask} className='form-control form-control-lg'/>
        </div>
        <div className='col-auto'>
          <button onClick={updatetask} className='btn btn-lg btn-success me-2'>Update</button>
          <button className='btn btn-lg btn-danger'>Cancel</button>
        </div>
       </div>






      {/* displays todos  */}
    {todo && todo.length? '': 'No Task....'}

    {todo && todo.map((task,index)=>{
        return(
          <React.Fragment key={task.id}>
            <div className='col taskBg'>
            <div className={task.status ? 'done':''}>
            <span className='taskNumber'>{index+1}</span>
            <span className='taskText'>{task.title}</span>
            </div>
            <div className='iconsWrap'>
            <span onClick={(e)=>markDone(task.id)} title="Completed/Not Completed"><FontAwesomeIcon icon={faCircleCheck}/></span>
            
            {task.status ? null:(
              <span title='Edit' onClick={()=> setUpdateData({
                id:task.id,title:task.title,status:task.status?true:false
              })}><FontAwesomeIcon icon={faPen}/></span>
            )}
            
            <span title='Delete' onClick={()=>deletetask(task.id)}><FontAwesomeIcon icon={faTrashCan}/></span>
            
            </div>
            </div>
          </React.Fragment>
        )
    })}
    </div>
  );
}

export default App;
