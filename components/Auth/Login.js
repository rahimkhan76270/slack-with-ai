// Login.js

'use client'
import { useState } from 'react';
import { initfirebase } from '@/lib/firebase_config';
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  initfirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const SignIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
  };
  const [user, loading] = useAuthState(auth);
  if (user) {
    return (
      <div>
        <button onClick={() => signOut(auth)}>signout</button>
      </div>
    )
  }
  else {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form  onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</Link>
            </div>
            <div>
            </div>
          </form>
          <button onClick={SignIn} className='m-2'>
            <img src="https://freelogopng.com/images/all_img/1657955079google-icon-png.png" alt="google logo" width={40} height={40} />
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
