import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { register, login } from "../../api/account";
import { useTranslation } from "react-i18next";

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(email, password, firstName, lastName);
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert(JSON.stringify(error.response?.data));
    }
  };
  const { t } = useTranslation()
  return (
    <div>
      <div className="w-[420px] h-auto mt-[80px] ml-[550px] flex flex-col">
        <form onSubmit={handleSubmit}>
          <h1 className="font-[500] dark:text-white text-[36px]">{t('createAccount.title')}</h1>

          <p className="font-[400] dark:text-white text-[16px] text-[#000000]">
            {t('createAccount.subtitle')}
          </p>

          <TextField
            sx={{ width: "420px", marginTop: "40px", }}
            label={t('createAccount.firstName')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            sx={{ width: "420px", marginTop: "20px" }}
            label={t('createAccount.lastName')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            sx={{ width: "420px", marginTop: "20px" }}
            label={t('createAccount.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            sx={{ width: "420px", marginTop: "20px" }}
            label={t('createAccount.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            sx={{
              width: "420px",
              height: "56px",
              marginTop: "20px",
              borderRadius: "4px",
              backgroundColor: "#DB4444",
              textTransform: "none",
            }}
            variant="contained"
          >
            {t('createAccount.createAccount')}
          </Button>

          <Button
            sx={{
              width: "420px",
              height: "56px",
              marginTop: "20px",
              border: "1px solid grey",
              borderRadius: "4px",
              textTransform: "none",
            }}
            variant="outlined"
          >
            {t('createAccount.google')}
          </Button>

          <div className="flex justify-center gap-2 mt-5">
            <span className="text-[#7D8184]">{t('createAccount.alreadyHaveAccount')}</span>

            <Link
              to="/NewLoginPage"
              className="font-medium border-b dark:text-white border-black"
            >
              {t('createAccount.login')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
