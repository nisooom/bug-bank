"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth";
import { LogOut, User, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginComponent({
  name = "John Doe",
  email = "john@example.com",
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { handleLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const doSignOut = async () => {
    try {
      setIsLoading(true);
      await handleLogout();
      router.push("/");
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-white/10 bg-black/40 text-white backdrop-blur-lg transition-all hover:bg-black/50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-zinc-400">
            You are currently logged in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md bg-zinc-800/50 p-4">
            <User className="h-5 w-5 text-zinc-400" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-sm text-zinc-400">Name</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-md bg-zinc-800/50 p-4">
            <Mail className="h-5 w-5 text-zinc-400" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{email}</p>
              <p className="text-sm text-zinc-400">Email</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="destructive"
            className="w-full"
            onClick={doSignOut}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing Out...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
