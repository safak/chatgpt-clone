import { Link } from 'react-router-dom';
import './homepage.css';

const Homepage = () => {
    return (
        <div className='homepage'>
            <div className='hero'>
                <h1>AI Active Listener</h1>
                <p>Share your thoughts and get thoughtful responses</p>
                <div className="actions">
                    <Link to="/chat" className="cta-button">Start Chatting</Link>
                </div>
            </div>
            <div className="features">
                <div className="feature">
                    <h3>Thoughtful Response</h3>
                    <p>Calming Echo listens to what you say and responds with meaningful questions.</p>
                </div>
                <div className="feature">
                    <h3>Privacy</h3>
                    <p>Your date is encrypted and stored in your browser. Nothing is saved on a private server.</p>
                </div>
                <div className="feature">
                    <h3>Here for you</h3>
                    <p>Calming Echo is here to leand an ear whenever you need it.</p>
                </div>
            </div>
        </div>
    )
}

export default Homepage