import React from "react";
<<<<<<< Updated upstream

export default function transactions() {
  return <div>{/* ADD LOGIC HERE */}</div>;
=======
import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Input, Button, FormFeedback, FormGroup, Label, Toast } from "reactstrap";
import styles from "../styles/Home.module.css";
import { useMutateCreateTransaction } from "../adapters/user.js"
import { useMutateupdateAccount } from "../adapters/user.js";
import { useMutateGetAccount } from "../adapters/user.js";
import apiService from "../services/apiService";

import moment from "moment";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [Amount, setAmount] = useState("");
  const createTransaction = useMutateCreateTransaction();
  const [accountId, setAcoountID] = useState("");
  const [Amountstate, setAmountstate] = useState();
  const updateaccount = useMutateupdateAccount();
  const [balance, setbalance] = useState("")
  const [toAccountID, settoAccountID] = useState("")
  const [toAccountIDstate, settoAccountIDstate] = useState("")
  const [toBalance, setTobalance] = useState();
  const getAccount = useMutateGetAccount();

  useEffect(() => {
    const accountid = localStorage.getItem("accountid");
    const balance = localStorage.getItem("balance")

    axios.get(`http://localhost:3000/transactions/${accountid}`).then((response) => {

      const data = response.data;
      setTransactions(data);
      console.log(accountId)

      setAcoountID(accountid);
      setbalance(balance);
    });



  }, []);

  const validateTransaction = (value) => {
    const NumberRegex = /^[0-9]+$/;

    let Amountstate;
    if (NumberRegex.test(value)) {
      Amountstate = "has-success";
    } else {
      Amountstate = "has-danger";
    }
    setAmountstate(Amountstate);
  };

  const validateAccount = (value) => {

    let toAccountIDstate;
    if (value.length == 24) {
      toAccountIDstate = "has-success";
    } else {
      toAccountIDstate = "has-danger";
    }
    settoAccountIDstate(toAccountIDstate);
  };



  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name == "Amount") {
      validateTransaction(value);
      setAmount(value);
    }
    if (name == "AccountNumber") {
      validateAccount(value)
      settoAccountID(value)
    }
  };


  const handleTransferSubmit = (event) => {
    event.preventDefault();
    validateAccount(toAccountID);
    validateTransaction(Amount);

    if (
      Amountstate === "has-success" &&
      toAccountIDstate === "has-success"

    ) {


      setTimeout(() => {
        axios.get(`http://localhost:3000/account/acc/${toAccountID}`).then((response) => {
          const data = response.data;
          // console.log(data.balance)
          setTobalance(data.balance)
        });
        axios.get(`http://localhost:3000/account/acc/${toAccountID}`).then((response) => {
          const data = response.data;
          // console.log(data.balance)
          setTobalance(data.balance)
        });
      }, 3000);


      setTimeout(() => {

        updateaccount.mutate({ accountId: accountId, balance: (parseInt(balance) - parseInt(Amount)) })

        createTransaction.mutate({ creditorId: 1, debitorId: 1, amount: +Amount, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: accountId })


        createTransaction.mutate({ creditorId: 1, debitorId: 1, amount: +Amount, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: toAccountID })
        console.log(toBalance)
        const newbalance = (parseInt(toBalance) + parseInt(Amount))
        updateaccount.mutate({ accountId: toAccountID, balance: newbalance })



        //  window.location.replace("http://localhost:3001");

      }, 1000);



    }

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validateTransaction(Amount);
    console.log(buttonIndex)
    if (buttonIndex == 1) {
      if (
        Amountstate === "has-success"

      ) {
        if (balance > 10 || balance < Amount) {
          console.log(balance)
          balance = parseInt(balance) - parseInt(Amount)
          localStorage.setItem("balance", balance)
          console.log(balance)

          updateaccount.mutate({ accountId: accountId, balance: balance })
          createTransaction.mutate({ creditorId: 1, debitorId: 1, amount: -Amount, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: accountId })


        } else {

          console.log("no balance")
        }


      }
    } else {
      if (
        Amountstate === "has-success"

      ) {
        if (balance > 10 || balance < Amount) {
          console.log(balance)
          balance = parseInt(balance) + parseInt(Amount)
          localStorage.setItem("balance", balance)
          console.log(balance)

          updateaccount.mutate({ accountId: accountId, balance: balance })
          createTransaction.mutate({ creditorId: 1, debitorId: 1, amount: Amount, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: accountId })


        } else {

          console.log("no balance")
        }


      }
    }

  };
  var buttonIndex = 1
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



      <div className={styles.App} >
        <h3>Create Transaction</h3>
        <Form className={styles.form} onSubmit={handleSubmit}>

          <FormGroup>
            <Label className={styles.label} for="Amount">
              Enter the Amount of the money
            </Label>
            <Input
              type="text"
              name="Amount"
              id="Amount"
              onChange={handleChange}
              valid={Amountstate === "has-success"}
              invalid={Amountstate === "has-danger"}
            />
            <FormFeedback>
              Please Enter a valid Number
            </FormFeedback>
          </FormGroup>

          <Button color="primary"  >Withdrawal</Button >{' '}
          <Button  >Deposit</Button>

        </Form>

      </div>


      <div className={styles.App} >
        <h3>Internal Transfer</h3>
        <Form className={styles.form} onSubmit={handleTransferSubmit}>

          <FormGroup>
            <Label className={styles.label} for="AccountNumber">
              Enter the Account id you want to transfer to
            </Label>
            <Input
              type="text"
              name="AccountNumber"
              id="AccountNumber"
              onChange={handleChange}
              valid={toAccountIDstate === "has-success"}
              invalid={toAccountIDstate === "has-danger"}
            />
            <Label className={styles.label} for="AmountNumber">
              Enter The Acount number you want to transfer to
            </Label>
            <Input
              type="text"
              name="Amount"
              id="Amount"
              onChange={handleChange}
              valid={Amountstate === "has-success"}
              invalid={Amountstate === "has-danger"}
            />


            <FormFeedback>
              Please Enter a valid Number
            </FormFeedback>
          </FormGroup>
          <Button color="primary">Submit</Button >{' '}

        </Form>

      </div>



    </div >
  );
>>>>>>> Stashed changes
}
