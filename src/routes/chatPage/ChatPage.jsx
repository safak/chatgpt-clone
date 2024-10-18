import { useRef } from 'react';
import './chatPage.css';
import { useEffect } from 'react';

 const ChatPage = () => {
  const endRef= useRef(null);
  useEffect(() => {
    const scrollToBottom = () => {
      endRef.current?.scrollIntoView({ behavior:'smooth' });
    };
    scrollToBottom();
  },[]);
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className='message'>Test message from ai asdasdas as  heae2 23123 sdasdas</div>
          <div className='message user'>Test message from user!Test message from user!Test message from user!Test message from user!</div>
          <div className='message'>Test message from ai</div>
          <div className='message user'>Test message from user</div>
          <div className='message'>Test message from ai!Test message from ai!Test message from ai!Test message from ai!!</div>
          <div className='message user'>Test message from user</div>
          <div className='message'>Test message from ai</div>
          <div className='message user'>Test message from user</div>
          <div className='message'>Test message from ai</div>
          <div className='message user'>Test message from user</div>
          <div className='message'>Test message from ai!Test message from ai!Test message from ai!Test message from ai!!</div>
          <div className='message user'>Test message from user</div>
          <div className='message'>Test message from ai</div>
          <div className='message user'>Test message from user</div>
          <div ref={endRef}/>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;