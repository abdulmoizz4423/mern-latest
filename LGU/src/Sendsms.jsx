// Import necessary hooks and libraries
import { useState } from "react";  // 'useState' to manage state in the functional component
import { useNavigate } from "react-router-dom";  // 'useNavigate' to handle navigation to different routes
import axios from 'axios';  // Axios for making HTTP requests to the server

// Sendsms component
function Sendsms() {
    const [cphone, setCphone] = useState();  
    const [msg, setMsg] = useState(); 
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission (page reload)

        // Send a POST request to the withdrawal endpoint with the account number and amount
        axios.post('http://localhost:2300/send-sms', { cphone, msg })
            .then(result => {
                // Log the response data from the server (for debugging purposes)
                console.log(result.data);
                if (result.data === "success") {
                    alert("sms sent successfull")
                    console.log("sms sent successfull")
                }
                console.log(result);
            })
            .catch(err => {
                // Log any error that occurs during the request
                console.log(err);
            });
    };
    // Return the JSX for the  form
    return (
        <div>
            <h1>Compose Message</h1>  

            
            <form onSubmit={handleSubmit}> 
                
               
               Enter Your Phone
                <input 
                    type="text"  
                    name="cphone" 
                    onChange={(e) => setCphone(e.target.value)} 
                      
                />
                <br></br>  {/* Line break for styling */}
               
                Enter Message 
                <textarea
                    name="msg" 
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}  
                >    
                </textarea>
                <br></br>  
                
               
                <button className="btn btn-success">Send </button>  {/* Button to submit the form */}
            </form>
        </div>
    );
} 


export default Sendsms;
