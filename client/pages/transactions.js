import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import styles from "../styles/Home.module.css";

function Transaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const accountid = localStorage.getItem("accountid");

    axios.get(`http://localhost:3000/transactions/${accountid}`).then((response) => {

      const data = response.data;
      console.log(data)
      setTransactions(data);
      console.log(data)
      localStorage.removeItem("accountid");

    });

  }, []);

  // const results = [];
  // const result = transactions.filter((obj) => {
  //   if (obj.creditorId === user.giuID) {
  //     results.push(obj)
  //   }
  //   return results
  // });


  const Thedata = transactions.map((trans, index) => {
    return (
      <tbody>
        <tr key={trans._id}>
          <td>{index}</td>
          <td>{trans.creditorId}</td>
          <td>{trans.debitorId}</td>

          <td>{trans.amount > 0 ? "Deposit = $" : "Withdrawal = $"}
            {trans.amount}</td>
          <td>{trans.date}</td>
          <td>{trans.transactionId}</td>
        </tr>
      </tbody>
    )
  })

  return (
    <div   >
      <h1>Transactions</h1>
      <Table >

        <thead>




          < tr >
            <th>#</th>
            <th></th>
            <th>creditorId</th>
            <th>debitorId</th>
            <th>amout</th>
            <th>date</th>
            <th>tracid</th>
          </tr>
        </thead>
        {Thedata}

      </Table>
    </div >
  );
}

export default Transaction;