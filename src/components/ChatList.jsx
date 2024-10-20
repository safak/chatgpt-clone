import { Link } from "react-router-dom";
import "./chatList.css";

const ChatList = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create new chat</Link>
      <Link to="/">Explore</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        <Link to={"/"}>My chat title</Link>
        <Link to={"/"}>My chat title</Link>
        <Link to={"/"}>My chat title</Link>
        <Link to={"/"}>My chat title</Link>
        <Link to={"/"}>My chat title</Link>
        <Link to={"/"}>My chat title</Link>
        <Link to={"/"}>My chat title</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="text">
          <span>Upgrade to TOYAI Pro</span>
          <span>Get unlimited access to all pages</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
