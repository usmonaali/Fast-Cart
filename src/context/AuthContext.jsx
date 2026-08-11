import { createContext, useContext, useState } from "react";
import { getToken, login as loginRequest, logout as logoutRequest } from "../api/account";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getToken());

  const signIn = async (email, password) => {
    await loginRequest(email, password);
    setUser(getToken());
  };

  const signOut = () => {
    logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth должен использоваться внутри <AuthProvider>");
  return ctx;
}