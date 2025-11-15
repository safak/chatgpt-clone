import { Link } from "react-router-dom";
import "./ChatList.css";

const ChatList = () => {
  return (
    <div className="chatlist">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore BYZAI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
        <Link to="/">My Chat Title</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="dashboard sidebar logo" />
        <div className="texts">
          <span>Upgrade to BYZAI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
