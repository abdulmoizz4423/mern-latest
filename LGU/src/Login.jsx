// Import necessary hooks and libraries
import { useState } from "react";  // 'useState' is used to manage state in functional components
import { useNavigate } from "react-router-dom";  // 'useNavigate' is used for navigating between routes
import axios from 'axios';  // Axios is a library for making HTTP requests

// The Login component to handle user authentication
function Login() {
    // State variables to store email and password input from the user
    const [email, setEmail] = useState();  // email state
    const [password, setPassword] = useState();  // password state
    
    // Initialize the navigate function from 'react-router-dom' for navigation
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior (page reload)
        
        // Make a POST request to the login API with email and password
        axios.post('http://localhost:2300/login', { email, password })
            .then(result => {
                // Check if the response message is "success"
                console.log(JSON.stringify(result, null, 2));
                if (result.status === 200) {

                    // If login is successful, navigate to the "home" page
                    navigate("/home");
                }
                // Log the full result for debugging purposes
                console.log(result);
            })
            .catch(err => {
                // Log any errors that occur during the request
                console.log(err);
            });
    };

    // Return the JSX for the Login form
    return (
        <div>
            <h3> LOGIN </h3>  {/* Heading for the Login form */}
            <form onSubmit={handleSubmit}>  {/* The form submission is handled by the handleSubmit function */}
                
                {/* Input field for the email */}
                Enter Email 
                <input 
                    type="email"  // Ensures the input is validated as an email
                    name="email" 
                    onChange={(e) => setEmail(e.target.value)}  // Updates the email state as the user types
                    required  // Makes the input field mandatory
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Input field for the password */}
                Enter Password 
                <input 
                    type="password"  // Ensures the input is hidden as the user types
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)}  // Updates the password state as the user types
                    
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Submit button */}
                <button className="btn btn-success">Login</button>  {/* Button to submit the form */}
            </form>
        </div>
    );
} // End of Login component

// Export the Login component so it can be used in other parts of the application
export default Login;
