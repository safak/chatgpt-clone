import React from 'react';
import { Link } from 'react-router-dom';  // Import Link here

function ChatList() {
  return (
    <div>
      <span>DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore LAMA Model</Link>
      <Link to="/">Contact Us</Link>
      <hr />
      <div>
        <Link to='/'>Chat Title</Link>
        <Link to='/'>Chat Title</Link>
        <Link to='/'>Chat Title</Link>
        <Link to='/'>Chat Title</Link>
        <Link to='/'>Chat Title</Link>
        <Link to='/'>Chat Title</Link>
      </div>

      <hr />
      <div className="upgrade">
        <Link to="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="35"
            height="35"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" fill="#00AEEF" />
            <rect
              x="35"
              y="35"
              width="30"
              height="30"
              fill="#FFF"
              transform="rotate(45 50 50)"
            />
          </svg>
          <span className="font-bold  ">Upgrade to Pro Version</span>
          <span>Get unlimited access to all our features</span>
        </Link>
      </div>
    </div>
  );
}

export default ChatList;
