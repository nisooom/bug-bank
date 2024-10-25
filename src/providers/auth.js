"use client"
import { checkLoggedIn } from "@/lib/auth";
import React, { useState, useEffect } from "react";
import { AuthContext } from "@/context/auth";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, IsMounted] = useState(false);

  useEffect(() => {
    IsMounted(true);
    const fetchUser = async () => {
      const user = await checkLoggedIn();
      
      
      setUser(user);
      setLoading(false);

    };

    fetchUser();
  }, [mounted]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
