import { Link } from "react-router-dom";
import "./chatList.css";

function ChatList() {
  return (
    <div className="chatList">
      <span className="title">Dashboard</span>
      <Link to="/">Create a new Chat</Link>
      <Link to="/">Explore Lama AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <div className="list">
        <Link to="/">Title chat</Link>
        <Link to="/">Title chat</Link>
        <Link to="/">Title chat</Link>
        <Link to="/">Title chat</Link>
        <Link to="/">Title chat</Link>
        <Link to="/">Title chat</Link>
        <Link to="/">Title chat</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="logo" />
        <div className="texts">
          <span>Upgrate to Pro</span>
          <span>Unlimited access...</span>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
