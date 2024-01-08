// UserProfile.js
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initfirebase } from '@/lib/firebase_config';
import { getAuth, updateProfile, updatePhoneNumber } from 'firebase/auth';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  initfirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [phone, setPhone] = useState('');
  const currentUser = auth.currentUser;
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);
    if (currentUser != null) {

      if (currentUser.email) { setEmail(currentUser.email); }
      if (currentUser.displayName) { setName(currentUser.displayName); }
      if (currentUser.photoURL) { setPhotoUrl(currentUser.photoURL); }
      if (currentUser.phoneNumber) { setPhone(currentUser.phoneNumber); }
    }
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [currentUser]);


  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl, phoneNumber: phone });
      toast(response)
    } catch (error) {
      // Handle error
      console.error('Error updating user profile:', error.message);
      toast(error.message);
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageref = ref(storage, `images/${user.email}/profile_pic`);
    if (file) {
      await uploadBytesResumable(storageref, file).then(async (snapshot) => {
        const downloadLink = await getDownloadURL(snapshot.ref);
        setPhotoUrl(downloadLink);
        toast("profile photo update 🤩🤩");
      });
    }
  };

  return (
    <div className="container m-8 px-4 w-1/2">
      {/* ... (rest of the component remains the same) */}
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
      <div className="container mx-auto mt-8">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              src={photoUrl}
              alt="User Profile"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{name}</h1>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        {/* <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div> */}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Update Photo</label>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute opacity-0 h-8"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Choose Photo
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Profile Photo URL</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
            readOnly
          />
        </div>
        <div className="mt-6">
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

  );
};

export default UserProfile;
