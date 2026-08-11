import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { login } from "../../api/account";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
const NewLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Заполните все поля.");
      return;
    }
    try {
      setErrorMessage("");
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Неверный email или пароль.");
    }
  };
  const {t} = useTranslation()
  return (
    <div>
      <div
        className={`w-[420px] h-[392px] mt-[110px] ml-[550px] flex flex-col`}
      >
        <h1 className={`font-[500] dark:text-white text-[36px]`}>{t('newLoginPage.title')}</h1>
        <p className={`font-[400] text-[16px] dark:text-white text-[#000000]`}>
          {t('newLoginPage.subtitle')}
        </p>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{
              width: "420px",
              height: "56px",
              marginTop: "20px",
            }}
            label={t('newLoginPage.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            sx={{
              width: "420px",
              marginTop: "20px",
            }}
            label={t('newLoginPage.password')}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            sx={{
              width: "420px",
              height: "56px",
              marginTop: "20px",
              backgroundColor: "#DB4444",
            }}
            variant="contained"
          >
            {t('newLoginPage.login')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewLoginPage;
