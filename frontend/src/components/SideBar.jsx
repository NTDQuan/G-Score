import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { MdDashboard } from "react-icons/md";
import { TbFileSearch } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import { HiDocumentReport } from "react-icons/hi";


const SIDEBAR_LINK = [
    {id: 1, path: "/", name: "Dashboard", icon: MdDashboard },
    {id: 2, path: "/search-score", name: "Search Scores", icon: TbFileSearch },
    {id: 3, path: "reports", name: "Reports", icon: HiDocumentReport },
    {id: 4, path: "Settings", name: "Settings", icon: AiFillSetting }
]

const SideBar = () => {
  const [isSelected, setIsSelected] = useState(1)
  const navigate = useNavigate()

  const onSelected = (id, path) => {
    setIsSelected(id)
    navigate(path)
  }

  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen pt-8 px-4 bg-white'>
      <div>
        <h1 className="text-2xl font-bold text-gray-500 md:block hidden">G-Score</h1>
        <h1 className="text-2xl font-bold text-gray-500 md:hidden block">G</h1>
      </div>
      <ul className='mt-6 space-y-6'>
        {SIDEBAR_LINK.map((link) => (
            <li key={link.id} 
                className={`font-medium rounded-md py-2 px-5 flex items-center md:space-x-5 transition-all 
                            cursor-pointer hover:bg-gray-100 
                            ${isSelected === link.id ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-500"}`}
                onClick={() => onSelected(link.id, link.path)}
            >
              <div className='flex items-center md:space-x-5'>
                <span>{link.icon()}</span>
                <span className='text-sm text-gray-500 hidden md:block'>{link.name}</span>
              </div>
            </li>
        ))}
      </ul>
    </div>

  )
}

export default SideBar
