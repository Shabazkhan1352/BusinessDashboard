'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React , {useState,useEffect} from 'react'


const page = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
       
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login',
                {email,password:pass},
                { withCredentials: true } 
            )
            console.log("Login Success: ", res.data);
            router.push('/dashboard');
            
        }
        catch(error){
            console.log("Login Error: ", error);
        }
       
         
       
       
    }


    return (
        <div className='bg-[#f6f6f8] text-black flex flex-col justify-center items-center h-screen gap-8 poppins'>
            {/* logo */}
            <h3 className='text-2xl font-bold ' ><span className='text-blue-600'>Intelli</span>Dash</h3>

            {/*login container  */}

            <div className='bg-white text-black px-6 py-10 rounded-lg flex-flex-col w-lg  '>
                <div className=''> <h2 className='text-2xl font-semibold text-center'>Sign In to AI Dashboard</h2>
                    <p className='text-center text-gray-500 text-sm font-semibold'>Enter your credentials to access the dashboard</p>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col mt-6 gap-4 font-semibold  ' action="">

                    <div className='flex flex-col gap-2'>
                        <label  className='text-sm' htmlFor="email">Work Email Address</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className='p-3 bg-transparent border border-gray-300 rounded-md' type="email" id="email" placeholder='Enter your work email' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <label className='text-sm' htmlFor="password">Password</label>
                            <a href="#" className='text-blue-600 text-sm hover:underline'>Forgot Password?</a>
                        </div>
                        <input value={pass} onChange={(e)=>setPass(e.target.value)} className='p-3 bg-transparent border border-gray-300 rounded-md' type="password" id="password" placeholder='Enter your password' />
                    </div>
                    <p className='flex items-center text-sm text-gray-500 gap-2'><input type="checkbox" id="remember" className='w-3 h-3' /> Remember me</p>

                    <button  className=' bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer' type='submit'>Sign In</button>
                </form>
            </div>
            <p className='text-sm text-gray-500 font-semibold'>New to the platform? <a href='#' className='text-blue-600 hover:underline'>Request Access</a></p>
        </div>
    )
}

export default page