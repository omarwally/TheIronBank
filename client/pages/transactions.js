import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//import { useFetchUser } from "../adapters/trans";
//import { QueryClientProvider } from "react-query";
// import { useFetchTransactions } from "../adapters/user";
function Transaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/transactions/list`).then((response) => {
      const data = response.data;
      setTransactions(data);
    });
  }, []);

  // const fetchTransaction = useFetchTransactions();
  // const dataa = fetchTransaction.data;
  // console.log(dataa);
  const user = JSON.parse(localStorage.getItem("user"));

  const result = transactions.filter((obj) => {
    return obj.creditorId === user.giuId;
  });

  return (
    <div className="Transactions">
      <h1>Transactions</h1>
      <ul>
        {result.map((item) => (
          <li key={item._id}>
            {item.amount > 0 ? "Deposit = $" : "Withdrawal = $"}
            {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transaction;