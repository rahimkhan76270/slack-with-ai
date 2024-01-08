import React, { useState } from 'react'
import { ChatList } from 'react-chat-elements'
import { getAuth } from 'firebase/auth'
import { initfirebase } from '@/lib/firebase_config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import SignIn from '@/pages/signin'
function UserChatList({ onMessageClick }) {
    initfirebase();
    const auth = getAuth();
    const db = getFirestore();
    const [user, loading] = useAuthState(auth);
    const [chatRooms, setChatRooms] = useState([]);
    const [ids, setIds] = useState(null);
    if (user) {
        async function getChatRooms() {
            const collref = collection(db, `users/${auth.currentUser.email}/chatrooms`);
            const data = await getDocs(collref);
            let chatIds = Object()
            setChatRooms([]);
            data.forEach(element => {
                const id = element.id;
                const user2 = element.data();
                chatIds[user2.email] = id;
                let chatObject = {
                    avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
                    alt: 'kursat_avatar',
                    title: user2.name,
                    subtitle: user2.email,
                    date: new Date(),
                    unread: 0,
                };
                setChatRooms((prev) => [...prev, chatObject])
            });
            setIds(chatIds)
        }
        const handleChatClick = (event) => {
            onMessageClick(event.title, event.subtitle, ids[event.subtitle]);
        }
        return (
            <div>
                <ChatList
                    className='chat-list'
                    dataSource={chatRooms}
                    onClick={handleChatClick}
                />
                <button onClick={getChatRooms} className='text-red-600'>Refresh</button>
            </div>
        )
    }
    else {
        return (
            <SignIn />
        )
    }
}

export default UserChatList