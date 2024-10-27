import { useQuery } from '@tanstack/react-query';
import './chatList.css';
import { Link } from 'react-router-dom';


/**
 * ChatList Component
 * 
 * This component fetches and displays the user's recent chat sessions and provides navigation options 
 * for the dashboard. The component uses React Query to manage and cache the chat data.
 * 
 * ### Features:
 * - **User Chats Query**: Fetches recent chat sessions from an API endpoint.
 * - **Navigation Links**: Links to start a new chat, explore additional resources, or contact support.
 * - **Upgrade Banner**: Displays a banner encouraging users to upgrade for more features.
 * 
 * ### API Integration:
 * - The component calls `/api/userchats` using fetch with `credentials: "include"` to maintain session cookies.
 * - If data is pending, it displays "Loading..."; in case of an error, it displays "error".
 * 
 * ### Styling:
 * - Utilizes `chatList.css` for styling, creating a modern and clean look for each section.
 * 
 * ### Example:
 * ```jsx
 * <ChatList />
 * ```
 * 
 * @returns {JSX.Element} ChatList component with navigation and recent chat links
 */

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