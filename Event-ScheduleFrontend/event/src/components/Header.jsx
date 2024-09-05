import React from "react";
import { Link } from "react-router-dom";

const Header=()=>{
    return(
        <div>
             <header>
                <div className="navbar">
                    <div className="logo">
                        <h2>Company <span>XYZ</span></h2>
                    </div>
                    <div className="bars">
                        <div className="emp" >
                            <Link to={'/emp'}>Employee Login</Link>
                        </div>
                        <div className="admin" id="admin">
                           <Link to={'/adminpage'}>Admin Login</Link>
                        </div>
                        <div className="logout" id="logout">
                           <Link to={'/'}>Logout</Link>
                        </div>
                    </div>

                </div>
            </header>
        </div>
    )
}
export default Header