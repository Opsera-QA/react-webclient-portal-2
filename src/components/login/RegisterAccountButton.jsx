import React from 'react';
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const DEFAULT_TENANT = "opsera.io";

function RegisterAccountButton() {
  const history = useHistory();

  const gotoSignUp = () => {
    //if free trial, go that form, otherwise use normal
    if (process.env.REACT_APP_STACK === "free-trial") {
      history.push("/trial/registration");
    } else {
      history.push("/signup");
    }
    history.go(0);
  };

  const goToLdapSignupForm = () => {
    const tenant = process.env.REACT_APP_OPSERA_TENANT;
    const accountRegistrationPath = `account/registration`;
    history.push(`/${accountRegistrationPath}/${tenant}`);
    history.go(0);
  };

  const getButton = () => {
    const tenant = process.env.REACT_APP_OPSERA_TENANT;

    console.log("environment tenant: " + tenant);
    console.log("DEFAULT_TENANT: " + DEFAULT_TENANT);
    console.log("typeof tenant === \"string\": " + typeof tenant === "string");
    console.log("tenant !== DEFAULT_TENANT: " + tenant !== DEFAULT_TENANT);

    if (typeof tenant === "string" && tenant.length > 0 && tenant !== DEFAULT_TENANT) {
      return (
        <Button variant="primary" className="btn-lg w-100 mb-3" onClick={() => goToLdapSignupForm()}>Add User To Account</Button>
      );
    }

    return (
      <Button variant="warning" className="btn-lg w-100 mb-3" onClick={gotoSignUp}>Register an Account</Button>
    );
  };

  return (
    <div className="col-md px-2">
      {getButton()}
    </div>
  );
}

export default RegisterAccountButton;