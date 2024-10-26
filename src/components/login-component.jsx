"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { logout } from "@/lib/auth";
import { AuthContext } from "@/context/auth";

const LoginComponent = ({ name, email }) => {
  const router = useRouter();
  const { handleLogout } = useContext(AuthContext);

  // if no user redirect home page

  const doSignOut = async () => {
    try {
      await handleLogout(); // Call the logout function
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex h-full items-start justify-center bg-background py-24">
      <Card className="w-80 border-white/15 bg-background text-white">
        <CardHeader>
          <CardTitle>Name</CardTitle>
          <CardDescription>{name}</CardDescription>
          <CardTitle>Email</CardTitle>
          <CardDescription>{email}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={doSignOut}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginComponent;
