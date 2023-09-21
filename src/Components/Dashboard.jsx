import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token, setToken }) => {
  const [name, setName] = useState('');
  const [zuku, setZuku] = useState('');

  if (!token) {
    if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
    }
  }

  useEffect(() => {
    // Check if the token exists before making API requests
    if (token) {
      try {
        axios
          .get('https://instagram-express-app.vercel.app/api/auth/zuku', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setZuku(res.data.data.message);
            setName(res.data.data.user.name);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [token]);

  function handleLogOut() {
    axios
      .delete('https://instagram-express-app.vercel.app/api/auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setZuku('');
        setName('');
        setToken('');
        // Remove token from local storage
        localStorage.removeItem('token');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Render the component only if the user is logged in (token exists)
  if (!token) {
    return null; // Return null to prevent rendering
  }

  return (
    <div>
      {name && <h1 className='font-bold text-2xl'>{name}</h1>}
      {zuku && <p className='font-medium text-emerald-300'>{zuku}</p>}
      {name && (
        <button
          onClick={handleLogOut}
          className='text-white mt-5 rounded-md py-2 px-4 bg-zinc-600 active:transform active:translate-y-1 transition-all duration-300'
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Dashboard;
