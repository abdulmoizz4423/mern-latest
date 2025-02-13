// Import necessary hooks and libraries
import { useState } from "react";  // 'useState' to manage state in functional components
import { useNavigate } from "react-router-dom";  // 'useNavigate' to handle navigation between pages
import { Link } from 'react-router-dom';  // 'Link' from react-router-dom for navigation
import axios from 'axios';  // Axios for making HTTP requests to the server

// Deposit component to handle depositing money into an account
function Deposit() {
    // State variables to store the account number and amount to be deposited
    const [account, setAccount] = useState();  // State variable to store the account number
    const [amount, setAmount] = useState();  // State variable to store the amount to deposit
    
    // Initialize 'useNavigate' hook to programmatically navigate between routes after form submission
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission (page reload)

        // Send a POST request to the deposit endpoint with the account number and amount
        axios.post('http://localhost:3450/deposit', { account, amount })
            .then(result => {
                // Log the result from the server (for debugging purposes)
                console.log(result.data);

                // Check if the deposit operation was successful
                if (result.data === "Success") {
                    // If the deposit was successful, navigate to the home page
                    navigate("/home");
                }

                // Log the full response for debugging purposes
                console.log(result);
            })
            .catch(err => {
                // Log any error that occurs during the request
                console.log(err);
            });
    };

    // Return the JSX for the Deposit form
    return (
        <div>
            {/* The form for depositing money into an account */}
            <form onSubmit={handleSubmit}>  {/* Trigger the handleSubmit function when the form is submitted */}
                
                {/* Input field for entering the account number */}
                Enter Account Number 
                <input 
                    type="text"  // Text input field for the account number
                    name="account" 
                    onChange={(e) => setAccount(e.target.value)}  // Update the account state when the user types
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Input field for entering the amount to deposit */}
                Enter Amount 
                <input 
                    type="text"  // Text input field for the deposit amount
                    name="amount" 
                    onChange={(e) => setAmount(e.target.value)}  // Update the amount state when the user types
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Submit button to trigger form submission */}
                <button className="btn btn-success">Deposit</button>  {/* Button to submit the form */}
            </form>
        </div>
    );
} // End of Deposit component

// Export the Deposit component to be used in other parts of the application
export default Deposit;
