import './homepage.css'
import { Link } from 'react-router-dom';
/**
 * Homepage component that serves as the main entry point to the Meller AI application.
 *
 * This component:
 * 1. Displays a welcome message with headings that introduce Meller AI.
 * 2. Provides a **Get Started** link for users to navigate to the Dashboard.
 * 3. Arranges a stylized layout with two main sections:
 *    - **Left Section**: Contains text elements for welcome and introduction.
 *    - **Right Section**: Includes decorative and visual elements, such as images and backgrounds.
 *
 * ### CSS Styling:
 * - The `homepage.css` file manages styling for layout, positioning, and animations.
 *
 * ### Visual Elements:
 * - **orbital.png**: Main background or theme image.
 * - **bot.png**: Represents a visual character or icon, enhancing the interface appeal.
 *
 * <Homepage />
 */

 const Homepage = () => {

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital"/>

      <div className="left">
        <h1>Welcome to Meller AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>This is the homepage of Meller AI, Enjoy boy..</h3>
        <Link to="/dashboard">Get Start</Link>
      </div>

      <div className="right">
        <div className="imgContainer"> 
          <div className="bgContainer">
            <div className="bg"></div>

          </div>
          <img src="/bot.png" alt="" className="bott" />
        </div>
      </div>
    </div>
  )
}

export default Homepage;