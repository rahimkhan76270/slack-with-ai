import { ChatList } from "react-chat-elements";
import { useEffect, useState } from "react";
import { initfirebase } from "@/lib/firebase_config";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import PopupForm from "./addContactPopup";
import CreateGroupPopupForm from "./createGroupPopup";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, getDocs, collection, updateDoc, setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";


function Contacts() {
  initfirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isGrPopupOpen, setGroupPopupOpen] = useState(false);
  const db = getFirestore();
  const handleOnSubmit = async (name, email) => {
    const id = uuidv4();
    if (user) {
      await setDoc(doc(db, `users/${auth.currentUser.email}/contacts/${id}`), { "name": name, "email": email })
        .then((res) => {
          toast("successfully added");
        }).catch((error) => {
          toast("something went wrong");
        })
    }
  }
  const getContacts = async () => {
    if (user) {
      const collref = collection(db, `users/${auth.currentUser.email}/contacts`);
      const data = await getDocs(collref);
      let contacts = []
      data.forEach(element => {
        const contact = element.data();
        let cont = {
          avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
          alt: 'kursat_avatar',
          title: contact.name,
          subtitle: contact.email,
          date: new Date(),
          unread: 0,
        }
        contacts.push(cont);
      });
      setUserData(contacts)
    }
  }

  useEffect(() => {
    // getContacts();
  })

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleGroupPopupOpen = () => {
    setGroupPopupOpen(true);
  }
  const handleGroupPopupClose = () => {
    setGroupPopupOpen(false);
  }
  const handleGroupPopupSubmit = () => {
    console.log("hello group popup")
  }
  return (
    <div><ChatList
      className='chat-list'
      dataSource={userData}
    />
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
      <button onClick={handleOpenPopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2">Add Contacts</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2" onClick={handleGroupPopupOpen}>Create Group</button>
      <PopupForm isOpen={isPopupOpen} onClose={handleClosePopup} onSubmit={handleOnSubmit} />
      <CreateGroupPopupForm isOpen={isGrPopupOpen} onClose={handleGroupPopupClose} onSubmit={handleGroupPopupSubmit} />
    </div>
  )
}

export default Contacts
