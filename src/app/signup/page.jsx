"use client";

import { useState } from "react";
import { loginWithGoogle } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      setErrorMessage("An error occurred during sign up. Please try again.");
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-white/10 bg-white/10 p-8 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Or{" "}
            <span className="font-medium text-primary">
              sign in to your existing account
            </span>
          </p>
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="mt-8">
          <Button
            onClick={handleGoogleSignUp}
            className="w-full bg-white text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign up with Google
          </Button>
        </div>

        <div className="mt-6">
          <p className="text-center text-sm text-muted-foreground">
            By signing up, you agree to our{" "}
            <a
              href="/terms"
              className="font-medium text-primary hover:text-primary/80"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-medium text-primary hover:text-primary/80"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
