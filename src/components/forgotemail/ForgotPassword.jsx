import { Button, TextField } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div>
      <div className={`pt-[150px] pl-[100px]`}>
        <form action="">
          <Button
            component={Link}
            to="/login"
            sx={{
              color: "#111927",
              fontWeight: "500",
              fontSize: "18px",
            }}
            variant="text"
          >
            <div className={`flex items-center gap-[10px]`}>
              <ArrowLeft /> Log in
            </div>
          </Button>

          <h1 className={`font-[700] mt-[10px] text-[24px] text-[#111927]`}>
            Forgot password
          </h1>

          <TextField
            sx={{
              width: "400px",
              marginTop: "30px",
            }}
            label="Email"
            type="email"
          />
          <br />

          <Button
            component={Link}
            to="/reset-password"
            sx={{
              width: "400px",
              height: "52px",
              paddingTop: "14px",
              paddingRight: "20px",
              paddingBottom: "14px",
              paddingLeft: "20px",
              marginTop: "20px",
            }}
            variant="contained"
          >
            Send reset link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;