import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around items-center bg-violet-950 p-4 w-full h-[6vh] text-white'>
        <div className="left font-medium text-2xl">
            iTask
        </div>
        <div className="right text-lg">
            <ul className='flex gap-4'>
                <li>Home</li>
                <li>Your Tasks</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
