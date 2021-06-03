import React, { useContext, useEffect, useReducer, useRef, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/AuthContext";
import Input from "../UI/Input/Input";

const initialStateEmail = { value: "", isValid: undefined };

const emailReducer = (prevState, action) => {
  switch (action.type) {
    case "INPUT_USER":
      return { value: action.value, isValid: false };
    case "INPUT_BLUR":
      return { value: prevState.value, isValid: prevState.value.includes("@") };
    default:
      break;
  }
};

const initialStatePassword = { value: "", isValid: undefined };

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case "INPUT_USER":
      return { value: action.value, isValid: false };
    case "INPUT_BLUR":
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 6,
      };
    default:
      break;
  }
};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialStateEmail
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialStatePassword
  );

  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(passwordIsValid && emailIsValid);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [passwordIsValid, emailIsValid]);

  const authCtx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "INPUT_USER", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "INPUT_USER", value: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const emailRef = useRef()
  const passwordRef = useRef()
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState, passwordState);
    } else if (!emailIsValid){
      emailRef.current.focus()
    } else {
      passwordRef.current.focus()
    }
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label="E-Mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          id="email"
          isValid={emailIsValid}
          ref={emailRef}
        />

        <Input
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label="Password"
          isValid={passwordIsValid}
          ref={passwordRef}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;