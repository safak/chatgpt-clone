import React from 'react'
import './ChatPage.css'
import NewPrompt from '../../layouts/components/newPrompt/NewPrompt';

const ChatPage = () => {
  

  return (
    <div className='chatPage'>
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <div className="message">Test</div>
          <div className="message user">Test user</div>
          <NewPrompt />
          <div/>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
