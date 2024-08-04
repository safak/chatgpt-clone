import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./chatList.css";

const ChatList = () => {
  // WE COULD HAVE USED A useEffect INSTEAD OF useQuery
  const { isPending, error, data } = useQuery({
    // WHEN WE ADD A NEW chat WE CAN REFETCH OUR chats USING THIS queryKey
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Lama AI</Link>
      <Link to="/">Contact</Link>
      
      <hr />

      <span className="title">RECENT CHATS</span>
      
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>

      <hr />
      
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        
        <div className="texts">
          <span>Upgrade to Lama AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;