import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


function DashboardLayout() {
  const {userId, isLoaded} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("sign-in")
    }
  }, [isLoaded, userId, navigate])

  if(!isLoaded) return (<>
  <div className='text-white'>Loading....</div></>);
  return (
    <div>
        <menu className='text-white'>Menu</menu>
        <div>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default DashboardLayout
