import React, { useState } from "react";
import Welcome from "../../components/welcome/Welcome";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ password, confirmPassword });
    navigate("/login");
  };

  return (
    <div className={`flex`}>
      <Welcome />

      <div className={`pt-[150px] pl-[100px]`}>
        <form onSubmit={handleSubmit}>
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
            sx={{ width: "400px", marginTop: "30px" }}
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <br />

          <TextField
            sx={{ width: "400px", marginTop: "20px" }}
            label="Confirm password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm((v) => !v)} edge="end" size="small">
                      {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <br />

          <Button
            type="submit"
            sx={{
              width: "400px",
              height: "52px",
              marginTop: "20px",
            }}
            variant="contained"
          >
            Reset
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;