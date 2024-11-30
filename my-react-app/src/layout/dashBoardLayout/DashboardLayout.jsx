import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ChatList from '../../components/chatlist/ChatList'


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
        <menu className='text-white'>
          <ChatList/>
        </menu>
        <div>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default DashboardLayout
