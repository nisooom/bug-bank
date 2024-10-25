"use client";
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { logout } from '@/lib/auth';
import { AuthContext } from '@/context/auth';

const LoginComponent = ({ name, email }) => {
    const router = useRouter();
    const { handleLogout } = useContext(AuthContext);

    // if no user redirect home page

    const doSignOut = async () => {
        try {
            await handleLogout(); // Call the logout function
            router.push('/'); // Redirect to the home page
            
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-80">
                <CardHeader>
                    <p>Name</p>
                    <CardTitle>{name}</CardTitle>
                    <p>Email</p>
                    <CardDescription>{email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button 
                        onClick={doSignOut} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Sign Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginComponent;
