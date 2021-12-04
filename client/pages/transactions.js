import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const userr = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios.get("http://localhost:3002/transactions/list").then((response) => {
      const data = response.data;
      setTransactions(data);
    });
  }, []);

  const result = transactions.filter((obj) => {
    return obj.creditorId === userr.id;
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