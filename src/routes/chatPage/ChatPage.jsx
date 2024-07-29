import NewPrompt from '../../components/newPrompt/NewPrompt'
import './chatPage.css'

const ChatPage = () => {
  return (
    <div className="chatPage">
      <div className="wrapper">
        {/* IT'S ADDED SO THAT WE ARE ABLE TO SCROLL */}
        <div className="chat">
          <div className="message">Test from AI</div>
          <div className="message user">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores optio adipisci fugit quaerat molestiae! Voluptatibus, sint iure? Corrupti cum adipisci dolores pariatur velit temporibus repellat?</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>
          <div className="message">Test from AI</div>
          <div className="message user">Test from user</div>

          <NewPrompt />          
        </div>
      </div>
    </div>
  )
}

export default ChatPage