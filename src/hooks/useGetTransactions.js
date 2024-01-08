import { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const transactionCollectionRef = collection(db, "transactions")
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0
      });
    const { userID } = useGetUserInfo();
    // console.log(userID);



    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0;
                let totalBalance = 0;

                snapshot.forEach((doc) => {

                    const data = doc.data();
                    // console.log(data);

                    const id = doc.id

                    docs.push({ ...data, id });

                    if (data.transactionType === "expense")
                        totalExpense += Number(data.transactionAmount)
                    else
                        totalIncome += Number(data.transactionAmount)

                        // console.log(totalExpense, totalIncome)


                });
                setTransactions(docs)
                
                totalBalance = totalIncome - totalExpense
                
                setTransactionTotals({
                    balance: totalBalance,
                    income: totalIncome,
                    expenses: totalExpense
                  });

                //   console.log(transactionTotals)

                


            });

        }
        catch (err) {
            // console.error(err)
        }
        

        return () => unsubscribe();
    }

    useEffect(() => {
        getTransactions();
    }, [])
    // console.log("Updated transactionTotals:", transactionTotals);
    return { transactions, transactionTotals };
}