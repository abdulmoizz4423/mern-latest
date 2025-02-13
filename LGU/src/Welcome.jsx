import React from "react"
import { Link } from 'react-router-dom';  // 'Link' from 'react-router-dom' to create links for navigation
function Welcome ()
{
       
    return (
        <div>
            <h1>Welcome to LGU Bank</h1>
            <Link to="/login" className="btn btn-success">Login</Link>
            <Link to="/register" className="btn btn-success">SignUp</Link>
        </div>
        

    );

}
export default Welcome;