"use client"
import { checkLoggedIn } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
const Navbar = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const router = useRouter();


  const initials =
    user && user.name
      ? user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
      : "";

  return (
    // <div className="
    // ">
    //   {
    //     loading?(<>Loading...</>):
    //     user?(<>Sign out</>):(<>Signin</>)
    //   }
    // </div>
    <div className="absolute flex h-14 w-full items-center justify-between border-b-[1.5px] border-tertiary px-4 text-white">
      <Link
        href="/"
        type="button"
        className="flex h-auto items-center justify-center gap-1 rounded border-[1.5px] border-accent/15 bg-secondary px-2 py-1 text-lg font-semibold"
      >
        {/* <Image
          src="./gitknit.svg"
          alt="logo"
          width={48}
          height={48}
          className="aspect-square w-7"
        /> */}
        Bug Bank
      </Link>
      {loading ? (
        <div className="flex items-center gap-2">
          <span>Loading...</span>
        </div>
      ) : user ? (
        <Link
          href="/account"
          className="flex aspect-square h-2/3 items-center justify-center gap-4 rounded-full bg-accent/25"
        >
          {initials}
        </Link>
      ) : (
        <Link
          href="/signup"
          className="flex items-center gap-2 rounded border-[1.5px] border-accent/15 px-2 py-1 text-white"
        >
          Sign in
        </Link>
      )}
    </div>
  );
};


const NavbarWrapper = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Navbar />
      <main className="w-full flex-grow pt-14">{children}</main>
    </div>
  );
};


export default NavbarWrapper;
