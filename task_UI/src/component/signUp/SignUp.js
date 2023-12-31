import React, { useState } from "react";
import {
  FormControl,
  FormGroup,
  TextField,
  styled,
  Button,
} from "@mui/material";
import { validPhone, validEmail } from "../../helper";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../services";
import { HashLink as Link } from 'react-router-hash-link';

const Container = styled(FormGroup)(`
    width:30%;
    border-radius:10px;
    margin: 0  auto 0 auto;
    & > div {
        margin-top:20px
    }
`);
const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    reEnteredPassword: "",
  });
  const [errorObj, setErrorObj] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errorList = {};

    if (!user.username) {
      errorList.username = "Please Provide username.";
    }

    if (!user.email) {
      errorList.email = "Please Provide email Id.";
    }
    if (user.email) {
      if (!validEmail(user.email)) {
        errorList.email = "Please Provide a valid email Id";
      }
    }

    if (!user.phone) {
      errorList.phone = "Please provide a phone number.";
    }
    if (user.phone) {
      if (!validPhone(user.phone)) {
        errorList.phone = "Please provide a valid phone Number.";
      }
    }
    if (user.phone) {
      if (user.phone.length > 10) {
        errorList.phone = "Please provide a valid phone Number.";
      }
    }

    if (!user.password) {
      errorList.password = "Please provide a password.";
    }
    if (user.password) {
      if (user.password.length > 10) {
        errorList.password =
          "Please provide a password less than 10 characters.";
      }
    }

    if (user.password) {
      if (!user.reEnteredPassword) {
        errorList.reEnteredPassword = "Please re entered the password";
      }
    }
    if (user.password) {
      if (user.reEnteredPassword.length > 10) {
        errorList.reEnteredPassword =
          "Please provide a password less than 10 characters.";
      }
    }
    if (user.password && user.reEnteredPassword) {
      if (user.password !== user.reEnteredPassword) {
        errorList.reEnteredPassword = "The password you entered is in-correct";
      }
    }

    if (Object.keys(errorList).length == 0) {
      setErrorObj({});
      return true;
    } else {
      setErrorObj(errorList);
      errorList = {};
      return false;
    }
  };

  const onHandleValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    let response = await createNewUser(user);
    if (response.data.error) {
      alert(response.data.error);
    } else {
      navigate("/");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/a3/d8/8e/a3d88e30cd966d4c4d1eb2beb3556665.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        //   backgroundPosition: 'center',
        minHeight: "100vh",
      }}
    >
      <div style={{ 
        backgroundColor: "gray", 
        height: 720,
        width: 600,
        borderRadius:40,
        marginLeft:70,
       }}>
        <Container style={{ marginLeft: 150 }}>
          <FormControl>
            <h1> Registration </h1>
            <TextField
              error={errorObj.username}
              helperText={errorObj.username}
              placeholder="Username"
              onChange={(e) => onHandleValueChange(e)}
              name="username"
            />
          </FormControl>
          <FormControl>
            <TextField
              error={errorObj.email}
              helperText={errorObj.email}
              placeholder="Email"
              onChange={(e) => onHandleValueChange(e)}
              name="email"
            />
          </FormControl>
          <FormControl>
            <TextField
              error={errorObj.phone}
              helperText={errorObj.phone}
              placeholder="Phone"
              onChange={(e) => onHandleValueChange(e)}
              name="phone"
            />
          </FormControl>
          <FormControl>
            <TextField
              error={errorObj.password}
              helperText={errorObj.password}
              placeholder="Password"
              type="password"
              onChange={(e) => onHandleValueChange(e)}
              name="password"
            />
          </FormControl>
          <FormControl>
            <TextField
              error={errorObj.reEnteredPassword}
              helperText={errorObj.reEnteredPassword}
              placeholder="Re-Enter password"
              type="password"
              onChange={(e) => onHandleValueChange(e)}
              name="reEnteredPassword"
            />
          </FormControl>
          <FormControl>
            <Button
              style={{
                borderRadius: 10,
                width: 300,
                alignSelf: "center",
                backgroundColor: "gray",
              }}
              variant="contained"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <div style={{ margin: 10 }}></div>
            <p style={{textAlign: "center" , color:"white"}} >
            You have an account ? <Link style={{fontSize:20}} to="/">Signin here</Link>
            </p>
          </FormControl>
        </Container>
      </div>
    </div>
  );
};

export default Signup;
