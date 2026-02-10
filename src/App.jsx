import { useState,useEffect } from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    let todostring=localStorage.getItem("todos")
    if(todostring){
      let tds=JSON.parse(localStorage.getItem("todos"))
      settodos(tds)
    }
  }, [])
  
  const savetoLS= () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const togglefinish=()=>{
    setshowfinished(!showfinished)
  }
  
  const handleAdd=()=>{
    settodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
    settodo("")
    savetoLS()
  }
  const handleDelete=(e,id)=>{
      let newtodos=todos.filter(item=>{
        return item.id!==id
      })
      settodos(newtodos)
      savetoLS()
  }
  const handleEdit=(e,id)=>{
    let t=todos.filter((i)=>i.id===id)
    settodo(t[0].todo)
    settodos(todos.filter(i=>i.id!==id))
    savetoLS()
  }
  const handleChange=(e)=>{
    settodo(e.target.value)
  }
  const handleCheckboxChange= (e) => {
    let id=e.target.name;
    console.log(id)
    let idx = todos.findIndex(item=>{
      return item.id===id;      
    })
    let newtodos=[...todos]
    newtodos[idx].isCompleted=!newtodos[idx].isCompleted;
    settodos(newtodos)
    console.log(newtodos)
    savetoLS()
  }
  
  
  
  return (
    <>
    <Navbar/>
    <div className=" md:container bg-slate-300 p-4 rounded-xl  md:w-1/3 md:mx-auto min-h-[80vh] my-5">
    <h1 className='text-center font-bold text-2xl'>iTodo-Manage your todos at one place</h1>
      <div className="add">
        <h2 className=' my-4text-xl font-bold'>Add a todo</h2>
        <input onChange={handleChange} className='bg-white w-full' type="text" value={todo} />
        <button onClick={handleAdd} disabled={todo.length<3} className='bg-slate-800  my-3 w-full text-white px-3 py-1 rounded-md font-bold cursor-pointer hover:bg-slate-900'>Submit</button>
      </div>
      <input className='m-4 cursor-pointer' onChange={togglefinish} type="checkbox" checked={showfinished} /> Show finished
    <div className='text-xl font-bold mx-5 my-5'>Your Todos</div>
    <div className=" todos">
    {todos.length==0 && <div className='m-5'>No todos to display</div>}
      {todos.map(item=>{
        return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between  my-4">
          <div className='flex gap-5'>
            <input onChange={handleCheckboxChange} name={item.id} type="checkbox" checked={item.isCompleted} id="" />
        <div  className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          
        <div className="buttons">
          <button onClick={(e)=>handleEdit(e,item.id)} className='bg-slate-800 mx-1 cursor-pointer text-white px-3 py-1 rounded-md font-bold'><FaEdit /></button>
          <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-slate-800 mx-1 cursor-pointer text-white px-3 py-1 rounded-md font-bold'><MdDelete /></button>
        </div>
      </div>
      })}
      
    </div>
    </div>
    </>
  )
}

export default App
