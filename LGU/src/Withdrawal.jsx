// Import necessary hooks and libraries
import { useState } from "react";  // 'useState' to manage state in the functional component
import { useNavigate } from "react-router-dom";  // 'useNavigate' to handle navigation to different routes
import { Link } from 'react-router-dom';  // 'Link' from 'react-router-dom' to create navigation links
import axios from 'axios';  // Axios for making HTTP requests to the server

// Withdrawal component to handle the withdrawal process
function Withdrawal() {
    // State variables to store the account number and the amount for withdrawal
    const [account, setAccount] = useState();  // State to store the account number entered by the user
    const [amount, setAmount] = useState();  // State to store the withdrawal amount entered by the user
    
    // Initialize 'useNavigate' hook to programmatically navigate after successful withdrawal
    const navigate = useNavigate();

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission (page reload)

        // Send a POST request to the withdrawal endpoint with the account number and amount
        axios.post('http://localhost:3450/withdrawal', { account, amount })
            .then(result => {
                // Log the response data from the server (for debugging purposes)
                console.log(result.data);

                // Check if the withdrawal was successful
                if (result.data === "Success") {
                    // If successful, navigate to the home page
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

    // Return the JSX for the Withdrawal form
    return (
        <div>
            <h1>Withdrawal</h1>  {/* Heading for the Withdrawal page */}

            {/* The form for the user to input the account number and amount to withdraw */}
            <form onSubmit={handleSubmit}>  {/* Trigger the handleSubmit function when the form is submitted */}
                
                {/* Input field for entering the account number */}
                Enter Account Number 
                <input 
                    type="text"  // Text input field for the account number
                    name="account" 
                    onChange={(e) => setAccount(e.target.value)}  // Update the account state when the user types
                    required  // Mark the field as required
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Input field for entering the amount to withdraw */}
                Enter Amount 
                <input 
                    type="number"  // Number input field for the withdrawal amount
                    min="0"  // Minimum amount is 0
                    max="50000"  // Maximum withdrawal amount is 50,000
                    name="amount" 
                    onChange={(e) => setAmount(e.target.value)}  // Update the amount state when the user types
                    required  // Mark the field as required
                />
                <br></br>  {/* Line break for styling */}
                
                {/* Submit button to trigger form submission */}
                <button className="btn btn-success">Withdraw</button>  {/* Button to submit the form */}
            </form>
        </div>
    );
} // End of Withdrawal component

// Export the Withdrawal component to be used in other parts of the application
export default Withdrawal;
