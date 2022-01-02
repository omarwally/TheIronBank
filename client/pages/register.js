import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useMutateRegisterUser, useFetchUser, useMutateCreatAccount } from "../adapters/user.js"
import { useMutation } from "react-query";



export default function Register() {
  const [giuEmail, setgiuEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [giuEmailState, setgiuEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [giuID, setgiuID] = useState("");
  const [nameState, setNameState] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [usernameState, setUserNameState] = useState("");
  const [giuIDState, setgiuIDState] = useState("");
  const registerUser = useMutateRegisterUser()
  const createAccount = useMutateCreatAccount();

  const validategiuEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let giuEmailState;
    if (emailRegex.test(value)) {
      giuEmailState = "has-success";
    } else {
      giuEmailState = "has-danger";
    }
    setgiuEmailState(giuEmailState);
  };

  const validatePassword = (value) => {
    let passwordState;
    if (value.length > 5) {
      passwordState = "has-success";
    } else {
      passwordState = "has-danger";
    }
    setPasswordState(passwordState);
  };

  const validateConfirmPassword = (value) => {
    let confirmPasswordState;
    if (value == password && password.length > 0) {
      confirmPasswordState = "has-success";
    } else {
      confirmPasswordState = "has-danger";
    }
    setConfirmPasswordState(confirmPasswordState);
  };

  const validateName = (value) => {
    let nameState;
    if (value.length > 2) {
      nameState = "has-success";
    } else {
      nameState = "has-danger";
    }
    setNameState(nameState);
  };

  const validatePhone = (value) => {
    let phoneState;
    if (value.length > 10) {
      phoneState = "has-success";
    } else {
      phoneState = "has-danger";
    }
    setPhoneState(phoneState);
  };

  const validateUserName = (value) => {
    let usernameState;
    if (value.length > 3) {
      usernameState = "has-success";
    } else {
      usernameState = "has-danger";
    }
    setUserNameState(usernameState);
  };

  const validategiuID = (value) => {
    let giuIDState;
    if (value.length > 3) {
      giuIDState = "has-success";
    } else {
      giuIDState = "has-danger";
    }
    setgiuIDState(giuIDState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name)
    if (name == "name") {
      validateName(value);
      setName(value);
    }
    if (name == "phone") {
      validatePhone(value);
      setPhone(value);
    }
    if (name == "username") {
      validateUserName(value);
      setUserName(value);
    }
    if (name == "giuID") {
      validategiuID(value);
      setgiuID(value);
    }
    if (name == "giuEmail") {
      validategiuEmail(value);
      setgiuEmail(value);
    }
    else if (name == "confirm_password") {
      validateConfirmPassword(value);
      setConfirmPassword(value);
    }
    else {
      validatePassword(value);
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validategiuEmail(giuEmail);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);
    validateName(name);
    validatePhone(phone);
    validateUserName(username);
    validategiuID(giuID);
    if (
      giuEmailState === "has-success" &&
      passwordState === "has-success" &&
      confirmPasswordState === "has-success" &&
      nameState === "has-success" &&
      phoneState === "has-success" &&
      usernameState === "has-success" &&
      giuIDState === "has-success"
    ) {
      // Call User Register Adapter
      // useMutateRegisterUser({email: giuEmail});
      // useFetchUser(1)
      // useMutation(()=> {
      //   console.log('EE')
      // })
      // registerUser()
      console.log(name)
      console.log(username)
      console.log(phone)
      console.log(giuID)
      const balance = 100
      registerUser.mutate({ giuEmail, password, confirmPassword, name, username, phone, giuID })
      createAccount.mutate({ UserId: giuID, balance: balance })
    }
  };

  return (
    <div className={styles.App}>
      <h2>Register</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>

        <FormGroup>
          <Label className={styles.label} for="giuID">
            GIU ID
          </Label>
          <Input
            type="text"
            name="giuID"
            id="giuID"
            placeholder="Idenitification Number"
            onChange={handleChange}
            valid={giuIDState === "has-success"}
            invalid={giuIDState === "has-danger"}
          />
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="name">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            valid={nameState === "has-success"}
            invalid={nameState === "has-danger"}
          />
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="username">
            Username
          </Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            valid={usernameState === "has-success"}
            invalid={usernameState === "has-danger"}
          />
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="phone">
            Phone Number
          </Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="xxxx-xxxxxxx"
            onChange={handleChange}
            valid={phoneState === "has-success"}
            invalid={phoneState === "has-danger"}
          />
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="giuEmail">
            GIU Email
          </Label>
          <Input
            type="text"
            name="giuEmail"
            id="giuEmail"
            placeholder="example@example.com"
            onChange={handleChange}
            valid={giuEmailState === "has-success"}
            invalid={giuEmailState === "has-danger"}
          />
          <FormFeedback>Please input a correct email.</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="password">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="**"
            onChange={handleChange}
            valid={passwordState === "has-success"}
            invalid={passwordState === "has-danger"}
          />
          <FormFeedback>
            Password must be at least 6 characters long.
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label className={styles.label} for="password">
            Confirm Password
          </Label>
          <Input
            type="password"
            name="confirm_password"
            id="password"
            placeholder="**"
            onChange={handleChange}
            valid={confirmPasswordState === "has-success"}
            invalid={confirmPasswordState === "has-danger"}
          />
          <FormFeedback>Passwords don't match.</FormFeedback>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
}