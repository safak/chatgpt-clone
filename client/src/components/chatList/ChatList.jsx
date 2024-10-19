import './chatList.css';
import { Link } from 'react-router-dom';

const chatList = () =>{
    return (
        <div className="chatList">
            <span className="title">DashBoard</span>
            <Link to="/dashboard">Create a new chat</Link>        
            <Link to="/">Explore Meller AI</Link>  
            <Link to="/">Contact</Link>  
            <hr/>
            <span className="title">Recent Chats</span>
            <div className="list">
                <Link to="/dashboard/chats/132131231231231231232332">My chat title</Link>  
                <Link to="/">My chat title</Link>  
                <Link to="/">My chat title</Link>  
                <Link to="/">My chat title</Link>  
                <Link to="/">My chat title</Link>  
                <Link to="/">My chat title</Link>  
                <Link to="/">My chat title</Link>  
                <Link to="/">My chat title</Link>  
                <Link to="/">My chat title</Link>  
                <Link to="/">My chat title</Link>  
            </div>
            <hr/>
            <div className="upgrade">
                <img src="/logo.png" alt="" />
                <div className="text">
                    <span >Upgrade to Meller Ai</span>
                    <span>Get unlimited access</span>
                </div>
            </div>
        </div>
    );
};

export default chatList;