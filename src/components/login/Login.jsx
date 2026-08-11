import React, { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { login, getToken } from "../../api/account";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Заполните все поля.");
      return;
    }
    try {
      setErrorMessage("");
      await login(email, password, "admin");
      const decoded = getToken("admin");
      if (decoded?.role === "Admin" || decoded?.role === "SuperAdmin") {
        navigate("/admin");
      } else {
        setErrorMessage(
          "Это вход для администраторов. Для покупателей используйте страницу входа в магазине.",
        );
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Неверный email или пароль.");
    }
  };

  return (
    <div className="pl-[190px] pt-[170px] w-[360px]">
      <h1 className="font-[700] text-[24px] text-[#111927]">Log in</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          sx={{
            width: "400px",
            marginTop: "20px",
          }}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />

        <TextField
          sx={{
            width: "400px",
            marginTop: "20px",
          }}
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((v) => !v)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <div className="text-right mt-2">
          <Link
            to="/forgot-password"
            className="text-sm text-[#2f6fed] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
        )}

        <Button
          type="submit"
          variant="contained"
          disableElevation
          sx={{
            marginTop: "10px",
            width: "400px",
            height: "56px",
          }}
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;
