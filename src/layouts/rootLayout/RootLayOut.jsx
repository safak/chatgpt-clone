import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";


const RootLayOut = () => {
    return (
        <div className="rootLayout">
            <header>
               <Link>
                 <img src="/logo.png" alt="logo"/>
                 <span>IntellectBot</span>
               </Link>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayOut;