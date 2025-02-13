// Import necessary hooks and libraries
import { useState } from "react";  // 'useState' to manage state in the functional component
import { useNavigate } from "react-router-dom";  // 'useNavigate' to handle navigation to different routes
import { Link } from 'react-router-dom';  // 'Link' from 'react-router-dom' to create navigation links
import axios from 'axios';  // Axios for making HTTP requests to the server

// Sendemail component
function Sendemail() {
    // State variables to store the account number and the amount for withdrawal
    const [name, setName] = useState();  
    const [email, setEmail] = useState();  
    const [msg, setMsg] = useState(); 
    
    // Initialize 'useNavigate' hook to programmatically navigate after successful withdrawal
    const navigate = useNavigate();

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission (page reload)

        // Send a POST request to the withdrawal endpoint with the account number and amount
        axios.post('http://localhost:2300/send-email', { name, email, msg })
            .then(result => {
                // Log the response data from the server (for debugging purposes)
                console.log(result.data);

                // Check if the withdrawal was successful
                if (result.data === "success") {
                    // If successful, navigate to the home page
                    //navigate("/home");
                    alert("email sent successfull")
                    console.log("email sent successfull")
                }
                
                // Log the full response for debugging purposes
                console.log(result);
            })
            .catch(err => {
                // Log any error that occurs during the request
                console.log(err);
            });
    };

    // Return the JSX for the Withdrawal form
    return (
        <div>
            <h1>Compose Email</h1>  

            
            <form onSubmit={handleSubmit}> 
                
               
                Enter Your Name
                <input 
                    type="text"  
                    name="name" 
                    onChange={(e) => setName(e.target.value)}  
                    
                />
                <br></br>  
                Enter Your email
                <input 
                    type="email"  
                    name="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                      
                />
                <br></br>  {/* Line break for styling */}
               
                Enter Message 
                <textarea
                    name="msg" 
                     value={msg}
                    onChange={(e) => setMsg(e.target.value)}  
                >    
                hello
                </textarea>
                <br></br>  
                
               
                <button className="btn btn-success">Send</button>  {/* Button to submit the form */}
            </form>
        </div>
    );
} 


export default Sendemail;
