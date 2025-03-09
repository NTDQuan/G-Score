import React from 'react'
import { Outlet } from 'react-router-dom'

import SideBar from './SideBar'

const Layout = () => {
  return (
    <>
      <div className='min-h-screen w-full'>
        <SideBar />
        <div className='ml-16 md:ml-56'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
