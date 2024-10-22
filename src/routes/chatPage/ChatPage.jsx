import { useRef } from "react";
import "./chatPage.css";
import { useEffect } from "react";
import NewPrompt from "../../components/newPrompt/NewPrompt";

function ChatPage() {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test message</div>
          <div className="message user">Lorem ipsum dolor sit amet.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <div className="message">Test message</div>
          <div className="message user">Test message from user.</div>
          <NewPrompt />
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
