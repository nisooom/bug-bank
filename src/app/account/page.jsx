// "use client";
// import React, { useContext } from "react";
// import { AuthContext } from "@/context/auth";

// const LoadingSpinner = () => (
//   <div className="flex min-h-screen items-center justify-center">
//     <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
//   </div>
// );

// const Page = () => {
//   const { user, loading, handleLogout } = useContext(AuthContext);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="">
//       {JSON.stringify(user)}
//     </div>
//   );
// };

// export default Page;

import React from 'react'
import { checkLoggedIn } from '@/lib/auth'


const page = () => {

    const user = checkLoggedIn();

  return (
    <div>
        <h1>Account</h1>
        <div className="">
            {JSON.stringify(user)}
        </div>
    </div>
  )
}

export default page