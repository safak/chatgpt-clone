import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='dashboardLayout'>
      <div className="menu">Menu</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout