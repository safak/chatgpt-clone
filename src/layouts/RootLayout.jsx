import { Link,Outlet } from 'react-router-dom'
import './rootLayout.css'

 const RootLayout = () => {
  return (
    <div className='rootLayout'>
        <header>
            <Link to="/">
            <img src="logo.png" alt="" />
            <span> MELLER AI</span>
            </Link>
        </header>

        <main>
            <Outlet/>
        </main>

  
    </div>
  )
}

export default RootLayout