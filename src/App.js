import './App.css';
import { useState } from 'react';
import Login from './Components/LogIn';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';

function App() {

  const [token, setToken] = useState('')


  return (

    <div className=' bg-zinc-900 md:px-80 text-white w-screen min-h-screen flex flex-col items-start justify-start flex-wrap'>
      <div className=' w-full flex items-start justify-between flex-wrap mb-10'>
        <SignUp setToken={setToken} />
        <Login setToken={setToken} />
      </div>
      <Dashboard
        token={token}
        setToken={setToken}
      />
    </div>
  );
}

export default App;
