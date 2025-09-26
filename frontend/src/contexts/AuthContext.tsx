import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { URL_API } from "../../config/api";

type AuthContextType = {
  user: User;
  token: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Recuperar el usuario almacenado en localStorage
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Cargar usuario desde el token (si existe)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Actualiza el estado del token // Restablece el token en el estado
      axios
        .get(`${URL_API}/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        })
        .catch(() => {
          localStorage.removeItem("user"); //Limpia el usuario de localStorage si hay error
          setUser(null); // Si el token es inválido, limpiamos usuario
        });
    }
  }, [token]);

  // Función para iniciar sesión
  const login = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${URL_API}/auth/login`, data);
      const { token, user } = response.data;

      // Guardar el token en localStorage y actualizar el estado
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error de autenticación",
          error.response?.data || error.message
        );
        throw error;
      }
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    localStorage.removeItem("user"); //Limpia el usuario de localStorage después de logout
    console.log("Usuario deslogeado: ", user);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
