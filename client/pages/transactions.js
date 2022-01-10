import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Input, Button, FormFeedback, select, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, FormGroup, Label, Toast } from "reactstrap";
import styles from "../styles/Home.module.css";
import { useMutateCreateTransaction } from "../adapters/user.js"
import { useMutateupdateAccount } from "../adapters/user.js";
// import { useMutateGetAccount } from "../adapters/user.js";
import { useMutateCreateExternalTransaction } from "../adapters/user"
import apiService from "../services/apiService";

import moment from "moment";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [Amount, setAmount] = useState("");
  const createTransaction = useMutateCreateTransaction();
  const CreateExternalTransaction = useMutateCreateExternalTransaction();
  const [accountId, setAcoountID] = useState("");
  const [Amountstate, setAmountstate] = useState();
  const updateaccount = useMutateupdateAccount();
  const [balance, setbalance] = useState("")
  const [toAccountID, settoAccountID] = useState("")
  const [toAccountIDstate, settoAccountIDstate] = useState()
  const [toBalance, setTobalance] = useState();
  const [bankName, setBankName] = useState("");

  // const getAccount = useMutateGetAccount();

  useEffect(() => {
    const accountid = localStorage.getItem("accountid");
    const balance = localStorage.getItem("balance")
    localStorage.removeItem("balance")
    localStorage.removeItem("accountid")


    axios.get(`http://localhost:3000/external/${accountid}`).then((response) => {

      const data = response.data;
      setTransactions(data);
    
      setAcoountID(accountid);
      setbalance(balance);


      console.log(accountId)
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
  const validateexTransaction = (value) => {
    const NumberRegex = /^[0-9]+$/;

    let Amountstate;
    if (NumberRegex.test(value) && value < 51 && (value + 5) <= balance) {
      Amountstate = "has-success";
    } else {
      Amountstate = "has-danger";
    }
    setAmountstate(Amountstate);
  };

  const validateAccount = (value) => {

    let toAccountIDstate;
    if (value.length == 12) {
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
    if (name == "exAmount") {
      validateexTransaction(value);
      setAmount(value);
    }
    if (name == "AccountNumber") {
      validateAccount(value)
      settoAccountID(value)
    }

    if (name == "SafeMonii") {

      setBankName("https://safemonii.loca.lt/external/transfer")
      console.log(bankName)


    } else if (name == "MYFSD") {
      setBankName("https://myfsd.loca.it/external/transfer")
      console.log(bankName)


    } else if (name == "Amry international bank") {
      setBankName("https://amryinternationalbank.loca.lt/external/transfer")
      console.log(bankName)

    } else if (name == "TheBlankBank") {
      setBankName("external/transfer")
      console.log(bankName)

    } else if (name == "luck bank") {
      setBankName("https://luckbank.loca.lt/external/transfer")
      console.log(bankName)


    } else if (name == " Solace") {
      setBankName("https://solace.loca.lt/external/transfer")
      console.log(bankName)

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

        return axios.get(`http://localhost:3000/account/acc/${toAccountID}`).then((response) => {
          const data = response.data;
          console.log(data.balance)
          setTobalance(data.balance)


          updateaccount.mutate({ accountId: accountId, balance: (parseInt(balance) - parseInt(Amount)) })

          createTransaction.mutate({ creditorId: toAccountID, debitorId: accountId, amount: +Amount, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: accountId })


          createTransaction.mutate({ creditorId: toAccountID, debitorId: accountId, amount: +Amount, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: toAccountID })
          console.log(toBalance)
          const newbalance = (parseInt(data.balance) + parseInt(Amount))
          console.log(toAccountID)
          updateaccount.mutate({ accountId: toAccountID, balance: newbalance })
        });




      }, 1000);



    }

  }

  const handleExternalTransferSubmit = (event) => {
    event.preventDefault();
    console.log(bankName)
    const data = new FormData();
    data= {
      receiverAccountNumber: a,
      amount: Amount,
      description: "external transfer"
    }

    console.log(bankname,data)
    CreateExternalTransaction.mutate({bankName,data})
    createTransaction.mutate({ creditorId: "External Bank", debitorId: accountId, amount: -Amount, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: accountId })
    createTransaction.mutate({ creditorId: "Transfer Fees", debitorId: accountId, amount: -5, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: accountId })
    updateaccount.mutate({ accountId: accountId, balance: (parseInt(balance) - parseInt(Amount)) - 5 })

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
          createTransaction.mutate({ creditorId: accountId, debitorId: accountId, amount: -Amount, date: moment().format("DD-MM-YYYY hh:mm:ss"), transactionId: accountId })


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
          {/* <td>{trans.transactionId}</td> */}
        </tr>
      </tbody>
    )
  })

  return (
    <div   >
      <Button href="/">
        Homepage

      </Button>

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
            {/* <th>tracid</th> */}
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
          </FormGroup >

          <Button color="primary"  >Withdrawal</Button >{' '}
          <Button color="primary"   >Deposit</Button>

        </Form >

      </div >


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



      <div className={styles.App} >
        <h3>External Transfer</h3>

        <Form className={styles.form} onSubmit={handleExternalTransferSubmit}>

          <FormGroup>
            <Label className={styles.label} for="Bankname">
              Enter the name of the bank
            </Label>

            <UncontrolledDropdown>

              <DropdownToggle caret>
                pick the bank name
              </DropdownToggle  >
              <DropdownMenu >
                <DropdownItem onClick={handleChange} name="SafeMonii"  >SafeMonii</DropdownItem>
                <DropdownItem onClick={handleChange} name="MYFSD"  >MYFSD</DropdownItem>
                <DropdownItem onClick={handleChange} name="Amry international bank" >Amry international bank</DropdownItem>
                <DropdownItem onClick={handleChange} name="TheBlankBank" >TheBlankBank</DropdownItem>
                <DropdownItem onClick={handleChange} name="luck bank"    >luck bank</DropdownItem>
                <DropdownItem onClick={handleChange} name=" Solace"    > Solace</DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>


            <Label className={styles.label} for="AccountNumber">
              Enter The Acount number you want to transfer to
            </Label>
            <Input
              type="text"
              name="AccountNumber"
              id="AccountNumber"
              onChange={handleChange}
              valid={toAccountIDstate === "has-success"}
              invalid={toAccountIDstate === "has-danger"}
            />
            <FormFeedback>
              Wrong Account numebr
            </FormFeedback>
            <Label className={styles.label} for="AmountNumber">
              Enter The Amount
            </Label>
            <Input
              type="text"
              name="exAmount"
              id="exAmount"
              onChange={handleChange}
              valid={Amountstate === "has-success"}
              invalid={Amountstate === "has-danger"}
            />


            <FormFeedback>
              Wrong Amount
            </FormFeedback>
          </FormGroup>
          <Button color="primary">Submit</Button >{' '}

        </Form>

      </div>




    </div >

  );
}
export default Transaction;
