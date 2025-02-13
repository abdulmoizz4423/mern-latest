// Import necessary hooks and libraries
import { useState } from "react";  // 'useState' hook to manage state in the functional component
import { Link } from 'react-router-dom';  // 'Link' from 'react-router-dom' to create links for navigation
import axios from 'axios';  // Axios for making HTTP requests
import { useNavigate } from "react-router-dom";  // 'useNavigate' to navigate programmatically between routes

// Signup component to handle user registration
function Signup() {
    // State variables to hold user input for name, email, and password
    const [name, setName] = useState();  // State to store the user's name
    const [email, setEmail] = useState();  // State to store the user's email
    const [password, setPassword] = useState();  // State to store the user's password
    
    // Initialize the navigate function for redirecting to other routes after registration
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior (page reload)

        // Send a POST request to the register endpoint with the user's name, email, and password
        axios.post('http://localhost:3450/register', { name, email, password })
            .then(result => {
                // After successful registration, navigate to the login page
                navigate("/login");
                console.log(result);  // Log the result for debugging
            })
            .catch(err => {
                // Log any errors that occur during the request
                console.log(err);
            });
    };

    // Return the JSX for the Signup form
    return (
        <div>
            <form onSubmit={handleSubmit}>  {/* Form submission is handled by the handleSubmit function */}
                
                {/* Input field for the user's name */}
                Enter Name 
                <input 
                    type="text"  // Text input for the name
                    name="name" 
                    onChange={(e) => setName(e.target.value)}  // Update the name state on change
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Input field for the user's email */}
                Enter Email 
                <input 
                    type="email"  // Email input field with built-in validation
                    name="email" 
                    onChange={(e) => setEmail(e.target.value)}  // Update the email state on change
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Input field for the user's password */}
                Enter Password 
                <input 
                    type="password"  // Password input with hidden characters
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)}  // Update the password state on change
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Submit button to trigger form submission */}
                <button className="btn btn-success">Register</button>  {/* Button with Bootstrap class */}
            </form>

            {/* Link to navigate to the login page */}
            <Link to="/login" className="btn btn-success">Login</Link>  {/* Link styled as a button to go to login page */}
        </div>
    );
} // End of Signup component

// Export the Signup component to be used in other parts of the application
export default Signup;
