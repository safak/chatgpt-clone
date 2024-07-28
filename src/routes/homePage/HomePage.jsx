import { Link } from 'react-router-dom'

import './homePage.css'

const HomePage = () => {
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className='orbital' />

      <div className="left">
        <h1>AI CHAT</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, magnam sit repellendus voluptas nam eligendi at. Officiis, deserunt velit! Quia a suscipit aliquid iste dolor.</h3>

        <Link to='/dashboard'>Get Started</Link>
      </div>

      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg">

            </div>
          </div>

          <img src="/bot.png" alt="" className='bot' />
        </div>
      </div>
    </div>
  )
}

export default HomePage