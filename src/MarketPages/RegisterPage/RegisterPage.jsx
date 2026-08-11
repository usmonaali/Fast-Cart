import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../../api/client";
import { login } from "../../api/account";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ") || "-";

    setIsSubmitting(true);
    try {
      await axiosRequest.post("/Account/register", {
        email: emailOrPhone,
        password,
        firstName,
        lastName,
      });
      await login(emailOrPhone, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Не удалось создать аккаунт. Проверьте данные.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-[80px] flex justify-center">
      <form onSubmit={handleSubmit} className="w-[350px]">
        <h1 className="font-[600] text-[28px] text-[#111927] mb-1">
          Create an account
        </h1>
        <p className="text-[14px] text-[#6C737F] mb-6">
          Enter your details below
        </p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b border-[#E5E7EB] py-2 mb-6 outline-none text-[14px]"
          required
        />
        <input
          type="text"
          placeholder="Email or phone number"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          className="w-full border-b border-[#E5E7EB] py-2 mb-6 outline-none text-[14px]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-b border-[#E5E7EB] py-2 mb-6 outline-none text-[14px]"
          required
        />

        {error && <p className="text-[13px] text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#F04438] hover:bg-[#D92D20] text-white py-3 rounded-md text-[14px] font-[500] mb-4"
        >
          {isSubmitting ? "Создаём..." : "Create Account"}
        </button>

        <button
          type="button"
          className="w-full border border-[#E5E7EB] py-3 rounded-md text-[14px] flex items-center justify-center gap-2"
        >
          Sign up with Google
        </button>

        <p className="text-[13px] text-[#6C737F] mt-6">
          Already have account?{" "}
          <Link to="/login" className="text-[#111927] underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
