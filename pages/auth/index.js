import React, { useState } from "react";
import LoginForm from "../../components/auth/login";
import { Card } from "react-bootstrap";
import RegisterForm from "../../components/auth/register";

const AuthPage = () => {
  const [status, setStatus] = useState(false);
  return (
    <div>
      <Card className="rtl w-50 ml-auto mr-auto mt-5">
        <Card.Header className="text-center">
          <h2>صفحه {!status ? "ورود" : "ثبت نام"}</h2>
        </Card.Header>
        <Card.Body>
          {!status ? (
            <LoginForm setStatus={(e) => setStatus(e)} />
          ) : (
            <RegisterForm setStatus={(e) => setStatus(e)}/>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuthPage;
