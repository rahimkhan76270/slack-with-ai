// Navbar.js
"use client"
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth,signOut } from "firebase/auth";
import { initfirebase } from "@/lib/firebase_config";
import Link from "next/link";
import ThemeToggler from "../Theme/ThemeToggler";

const Navbar = () => {
  initfirebase();
  const auth=getAuth();
  const [user,loading]=useAuthState(auth);
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-bold flex">
          <Image src="/slack.png" height={25} width={25} alt="logo" className="mx-2"></Image>
          Slack With AI
        </Link>

        <div className="space-x-4 flex justify-center items-center">
          <Link href="/" className="text-white">
          Home
          </Link>
          {(user)?(<button className='text-white' onClick={()=>signOut(auth)}>
            logout
          </button>):(<Link href="/signin" className='text-white'>
            Login
          </Link>)}
          {(user)?(<Link href="/signin"><img src={user.photoURL} className="rounded-2xl w-8 h-8 rounded-full"/></Link>):(" ")}
        </div>
        <div className='mr-2'>
          <ThemeToggler/>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
