import React, {useState} from 'react'
import axios from 'axios'

const SignUp = ({setToken}) => {

    const [user,setUser] = useState({name:"",email:"",password:"",confirmPassword:""});
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    // Destructuring the user obj for ease of use
    const {name,email,password,confirmPassword} = user;

    async function handleSubmit (e) {
        e.preventDefault();

        if(!name || !email || !password || !confirmPassword){
            setError("Please fill all the fields");
            setSuccess("")
            return
        }
        if(password !== confirmPassword){
            setError("Password and Confirm Password should be same");
            setSuccess("")
            return
        }

        console.log("I am here!!!");
        
        // api call
        try{
             const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",
            // const response =  await auth.post("/signup",
             {name:name, email:email, password:password})
             console.log(response.data) 
                setSuccess(response.data.message)
                setToken(response.data.data.token)
                setError("")
                //save token to local storage: 
                localStorage.setItem("token",response.data.data.token)
        }

        catch(err){
            setError(err.response.data.message)
            setSuccess("")
        }

    }

  return (
    <div className='flex flex-col items-center mt-20 justify-center mx-8'>
        <h1 className=' font-bold text-2xl mb-6'>Sign Up</h1>
        
        <form className='flex flex-col mb-6 ' onSubmit={handleSubmit}>
        <input 
        className='border-2 text-white shadow-md px-8 py-4 mt-2 rounded-lg outline-none bg-slate-700' type="text" placeholder='Enter name...' 
        onChange={(e) => setUser({...user, name:e.target.value})}/>
        
        <input 
        className='border-2 text-white shadow-md px-8 py-4 mt-2 rounded-lg outline-none bg-slate-700' type="email" placeholder='Enter email...'  
        onChange={(e) => setUser({...user, email:e.target.value})}/>
        
        <input 
        className='border-2 text-white shadow-md px-8 py-4 mt-2 rounded-lg outline-none bg-slate-700' type='password' placeholder='Enter Password...' 
        onChange={(e) => setUser({...user, password:e.target.value})}/>
        
        <input 
        className='border-2 text-white shadow-md px-8 py-4 mt-2 rounded-lg outline-none bg-slate-700' type='password' placeholder='Enter confirm Password...'  
        onChange={(e) => setUser({...user, confirmPassword:e.target.value})}/>
        
        <button type="submit" className='border mt-6 rounded-full bg-slate-800 text-white py-2 active:transform active:translate-y-1  hover:bg-slate-700 duration-300 hover:transition-all'>Submit</button>
        </form>

        {
            error && <p className=' text-red-500 font-bold w-full text-center'>{error}</p>
        }
        {
            success && <p className=' text-green-600 font-bold w-full text-center'>{success}</p>
        }
      
    </div>
  )
}

export default SignUp