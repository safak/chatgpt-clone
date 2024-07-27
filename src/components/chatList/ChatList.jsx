import { Link } from "react-router-dom";
import "./chatList.css";

const ChatList = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore GenX AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
        <Link to="/">Chat 1</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="GenX AI" />
        <div className="texts">
          <span>Upgrade to GenX AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
