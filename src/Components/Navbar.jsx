import React from 'react'

function Navbar() {
  return (
    <div>
      
        <div className="flex justify-around py-3 bg-slate-500">
          <div className="logo">
            <span className=' font-bold mx-9'>iTodo</span>
          </div>
          <ul className='flex gap-6 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all duration-300'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-300'>New Task</li>
          </ul>

        </div>
        
    </div>
  )
}

export default Navbar
