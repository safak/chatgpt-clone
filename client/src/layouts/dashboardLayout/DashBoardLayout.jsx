import { Outlet, useNavigate } from 'react-router-dom'
import './dashBoardLayout.css'
import {useAuth} from "@clerk/clerk-react"
import { useEffect } from 'react'
import ChatList from '../../components/chatList/ChatList'

const DashBoardLayout = () => {

  const {userId,isLoaded} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/sign-in")
    }
  },[isLoaded,userId,navigate])

  if(!isLoaded) return "Loading...";

  return (
    <div className='dashBoardLayout'>
        <div className="menu">
          <ChatList/>
        </div>
        <div className="content">
            <Outlet/>
        </div>
    </div>
  )
}

export default DashBoardLayout