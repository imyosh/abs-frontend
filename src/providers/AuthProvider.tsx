import { apiGetUser, apiLogout } from "@/api";
import Loading from "@/pages/loading";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

// import LoadingPage from "@/pages/LoadingPage";

// import log from 'electron-log/renderer'

// import { useEffectOnce } from "react-use";

export interface AuthProviderValue {
  user: User | null;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: string | React.JSX.Element | React.JSX.Element[] | React.ReactNode;
}

const AuthContext = createContext({} as AuthProviderValue);

// eslint-disable-next-line
export function useAuth() {
  return useContext<AuthProviderValue>(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    const res = await apiLogout();
    console.log("res", res);
    setUser(null);
    navigate("/");
  }, [setUser, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");
      const user = await apiGetUser();
      console.log("user", user);
      if (user) {
        setUser(user);
        navigate("/home");
      } else {
        navigate("/");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
