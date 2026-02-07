import React, { createContext, useContext, useState, useCallback } from "react";

interface Organizer {
  id: number;
  organizerId: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  organizer: Organizer | null;
  login: (email: string, password: string, organizerId: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizer, setOrganizer] = useState<Organizer | null>(() => {
    const stored = localStorage.getItem("organizer");

    if (!stored || stored === "undefined") {
      return null;
    }

    try {
      return JSON.parse(stored) as Organizer;
    } catch {
      localStorage.removeItem("organizer");
      return null;
    }
  });




  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) return false;

      const data = await response.json();

      setOrganizer(data.organizer);
      //console.log("Resposta do backend:", data);
      localStorage.setItem("organizer", JSON.stringify(data.organizer));

      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setOrganizer(null);
    localStorage.removeItem("organizer");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!organizer, organizer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
