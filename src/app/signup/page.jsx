"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loginWithGoogle } from "@/lib/auth";
import Google from "@/components/icons/Google";

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    }
  }, [error]);

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="border-tertiary flex w-full max-w-sm flex-col rounded-lg border-[1.5px] border-white/15 bg-background px-4 pb-8 pt-4 shadow-md">
        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800">
            {errorMessage}
          </div>
        )}

        <span className="w-full items-center justify-center text-center text-xl font-bold text-gray-300">
          Sign in to Google
        </span>
        <form action={loginWithGoogle} className=" ">
          <button
            type="submit"
            className="border-tertiary items-centerborder-secondary mt-4 flex w-full justify-start gap-2 rounded-md border-[1.5px] border-secondary bg-background px-4 py-2 text-lg font-medium text-white transition-colors hover:border-accent/50 hover:bg-foreground/80 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <Google size={24} className="mr-2 inline-block text-accent" />
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
