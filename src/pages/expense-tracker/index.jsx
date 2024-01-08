import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";

import './style.css'
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";


export const ExpenseTracker = () => {

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const { transactions, transactionTotals } = useGetTransactions()
    const { name, profilePhoto } = useGetUserInfo();
    const navigate = useNavigate();


    var fullName = name.split(' '),
        firstName = fullName[0]








    const { addTransaction } = useAddTransaction();
    const onSubmit = async (e) => {
        e.preventDefault()
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        });
        setDescription("")
        setTransactionAmount("")
    }

  
    const {expenses, balance, income} = transactionTotals;






    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1> {firstName}'s  Expense Tracker</h1>

                    <div className="balance">
                        <h3>Your Balance</h3>
                        {balance>=0 ? <h2>${balance}</h2> :  <h2>- $ {Math.abs(balance)}</h2> }

                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>${income}</p>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <p>${expenses}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit} >
                        <input type="text"
                            placeholder="Description"
                            value={description}
                            required
                            onChange={(e) => { setDescription(e.target.value) }}
                        />

                        <input type="number"
                            placeholder="Amount"
                            value={transactionAmount}
                            required
                            onChange={(e) => { setTransactionAmount(e.target.value) }}

                        />

                        <input type="radio"
                            id="expense"
                            value="expense"
                            onChange={(e) => { setTransactionType(e.target.value) }}
                            checked={transactionType === "expense"}
                        />
                        <label htmlFor="expense">Expense</label>

                        <input type="radio"
                            id="income"
                            value="income"
                            onChange={(e) => { setTransactionType(e.target.value) }}
                            checked={transactionType === "income"}
                        />

                        <label htmlFor="income">Income</label>

                        <button type="submit">Add Transaction</button>
                    </form>

                </div>
                {profilePhoto && (
                    <div className="profile">
                        <img className="profile-photo" src={profilePhoto} alt="PP" />
                        <button className="sign-out-button" onClick={async()=>{
                            try{
                            await signOut(auth);
                            localStorage.clear()
                            navigate("/")
                            }
                            catch(err){console.error(err)}
                        }}>
                            Sign Out
                        </button>
                    </div>
                )}

            </div>

            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction) => {
                        const { description, transactionAmount, transactionType } = transaction;

                        return (
                            <li key={Math.random()}>
                                <h4>{description}</h4>
                                <p > ${transactionAmount}  <label style={{ color: transactionType === "expense" ? "red" : "green" }}> {transactionType} </label></p>
                                <hr />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
};