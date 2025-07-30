import React from 'react'
import './Homepage.css'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'

const Homepage = () => {
    const [typingStatus, setTypingStatus] = useState("human1")

  return (
    <div className='homepage'>
       {/*  <Link to="/dashboard">Dashboard</Link> */}
       <img src="/orbital.png" alt="" className='orbital'/>
       <div className="left">
            <h1>YELL AI</h1>
            <h2>Supercharge your creativity and productivity</h2>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse a veniam atque quis laboriosam ad deleniti temporibus tempora, obcaecati sequi inventore, optio eaque voluptatibus! Ullam officia quam quidem quo perspiciatis.</h3>
            <Link to='/dashboard'>Get Strted</Link>
       </div>
       <div className="right">
        <div className="imgContainer">
            <div className="bgContainer">
                <div className="bg"></div>
            </div>
            <img src="/bot.png" alt="" className='bot' />
            <div className="chat">
                <img src={typingStatus === "human1" ? "/human1.jpeg" : typingStatus === "human2" ? "/human2.jpeg" : "/bot.png"} alt="" />
                <TypeAnimation
                    sequence={[
                        'Human: We produce food for Mice',
                        2000, () => {
                            setTypingStatus("bot")
                        }, 
                        'Bot: We produce food for Hamsters',
                        2000, () => {
                            setTypingStatus("human2")
                        },
                        'Human: We produce food for Guinea Pigs',
                        2000, () => {
                            setTypingStatus("bot")
                        },
                        'Bot: We produce food for Chinchillas',
                        2000, () => {
                            setTypingStatus("human1")
                        }
                    ]}
                    wrapper="span"
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
       </div>
       <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
            <Link to="/">Terms of Service</Link>
            <span>|</span>
            <Link to="/">Privacy Policy</Link>
        </div>
       </div>
    </div>
  )
}

export default Homepage

