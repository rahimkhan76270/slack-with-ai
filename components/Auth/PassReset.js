// Register.js
"use client"
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { initfirebase } from '@/lib/firebase_config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
const PassReset = () => {
    const [email, setEmail] = useState('');
    initfirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const handleClick = async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email)
            .then((result) => {
                toast("email sent successfully ✅✅")
                setEmail(" ")
            }).catch((error) => {
                toast(error.message);
            });
    };
    if (user) {
        return (
            <div><button onClick={() => signOut(auth)}>signOut</button></div>
        )
    }
    else {
        return (
            <div className="flex items-center justify-center h-screen dark:bg-black">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-slate-950 dark:text-white dark:shadow-md dark:shadow-slate-700" onSubmit={handleClick}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Send Link
                            </button>
                            <Link href="/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};

export default PassReset;
