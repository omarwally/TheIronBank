import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import styles from "../styles/Home.module.css";
import { Button, Navbar, NavbarBrand, NavbarToggler, Link, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from "reactstrap";
import { Container } from "reactstrap";
import apiService from "../services/apiService";




function Dashboard() {


  const [name, viewname] = useState([]);
  const [account, viewAccount] = useState([]);
  const userr = JSON.parse(localStorage.getItem("user"));

  useEffect(async () => {
    console.log("Mounting!");
    const user = JSON.parse(localStorage.getItem("user"));

    viewname(user)
    const response = await apiService.get(`http://localhost:3000/account/${user}`);
    viewAccount(response.data)
  }, []);
  console.log(account)
  const result = account.filter((acc) => {

    return acc.UserId == userr.giuID;
  });




  return (
    <div className={styles.App}>
      <nav>
        <Navbar
          color="black" container="lg" dark expand="sm" fixed="top"
        >
          <NavbarBrand href="/">
            The Iron Bank
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() { }} />
          <Collapse navbar>
            <Nav
              className="me-auto"
              navbar
            >
              <NavItem>
                <NavLink href="/transactions/">
                  Transactions
                </NavLink>
              </NavItem>
            </Nav>
            < NavItem>
              <NavLink onClick={() => { localStorage.removeItem("jwt"), localStorage.removeItem("user") }} href="/" >

                Logout
              </NavLink>
            </NavItem>
          </Collapse>
        </Navbar>
      </nav>

      <div >
        <h2> hi {name.name} </h2>

        <h2> Your email : {name.giuEmail} </h2>
      </div>

      <div >
        <ul className={styles.ul}>
          {result.map((item) => (
            <a key={item._id}
              onClick={() => { localStorage.setItem("accountid", item.accId), localStorage.setItem("balance", item.balance) }}
              href="/transactions" >
              <h2></h2>
              your Acount : {item.accId}  balance : {item.balance}
            </a>
          ))}
        </ul>
      </div>



    </div >

  );
}

export default Dashboard;
