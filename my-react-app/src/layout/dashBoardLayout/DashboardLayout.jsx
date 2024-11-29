import React from 'react'
import { Outlet } from 'react-router-dom'


function DashboardLayout() {
  return (
    <div>
        <menu>Menu</menu>
        <div>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default DashboardLayout
