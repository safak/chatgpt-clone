import { useQuery } from '@tanstack/react-query';
import './chatList.css';
import { Link } from 'react-router-dom';


const ChatList = () =>{
    
    const { isPending, error, data } = useQuery({
        queryKey: ['userChats'],
        queryFn: () =>
          fetch(`${import.meta.env.VITE_API_URL}/api/userchats`,{
            credentials:"include",
          }).then((res) =>
            res.json(),
          ),
    })

    return (
        <div className="chatList">
            <span className="title">DashBoard</span>
            <Link to="/dashboard">Create a new chat</Link>        
            <Link to="/">Explore Meller AI</Link>  
            <Link to="/">Contact</Link>  
            <hr/>
            <span className="title">Recent Chats</span>
            <div className="list">
                
              {isPending? "Loading.." : error? "error" : data?.map(chat=>(
                <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                    {chat.title}
                </Link>  
              ))}
            </div>
            <hr/>
            <div className="upgrade">
                <img src="/logo.png" alt="" />
                <div className="text">   
                    <span >Upgrade to Meller Ai</span>
                    <span>Get unlimited access</span>
                </div>
            </div>
        </div>
    );
};

export default ChatList;