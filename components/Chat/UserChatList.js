import React from 'react'
import { ChatList } from 'react-chat-elements'
import { getAuth } from 'firebase/auth'
import { initfirebase } from '@/lib/firebase_config'
import { useAuthState } from 'react-firebase-hooks/auth'
import SignIn from '@/pages/signin'
function UserChatList() {
    initfirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)

    if (user) {
        return (
            <div>
                <ChatList
                    className='chat-list'
                    dataSource={[
                        {
                            avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
                            alt: 'kursat_avatar',
                            title: user.displayName,
                            subtitle: user.email,
                            date: new Date(),
                            unread: 0,
                        },

                        {
                            avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
                            alt: 'kursat_avatar',
                            title: user.displayName,
                            subtitle: user.email,
                            date: new Date(),
                            unread: 0,
                        }
                    ]}
                />
            </div>
        )
    }
    else{
        return (
            <SignIn/>
        )
    }
}

export default UserChatList