import React from "react";
import { useState } from "react";
const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState("");
  const checkUserName = () => {
    if (!userName) {
      setValidUserName("Please enter valid user name");
    } else {
      setValidUserName("");
    }
  };

  return (
    <>
      <form className="loginform">
        <label>Sign In</label>
        <input
          onChange={(e) => {
            setUserName((prevuser) => (prevuser = e.target.value));
          }}
          placeholder="Username"
          onBlur={checkUserName}
          name="Username"
        ></input>
        <label className="input_error">{validUserName}</label>
        <input placeholder="Password" name="Password"></input>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default LoginPage;
