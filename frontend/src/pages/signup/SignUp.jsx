import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {

    const [inputs,setInputs]= useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender:""
    });

    const {loading, signup}=useSignup();

    const handleCheckBoxChange=(gender)=>{
        setInputs({...inputs, gender:gender});
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        // console.log(inputs);
        await signup(inputs)
    }

  return (
    <div className=' flex felx-col items-center justify-center min-w-96 mx-auto'>

        <div className='w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'> 
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Sign Up <span className=' text-blue-500'> ChatApp</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10' value={inputs.fullName}
                    onChange={(e)=>setInputs({...inputs, fullName:e.target.value})}
                    />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" placeholder='johndoe' className='w-full input input-bordered h-10' value={inputs.username}
                    onChange={(e)=>setInputs({...inputs, username:e.target.value})}
                    />
                </div>
                <div>
                    <label className='label '>
                        <span className='label-text text-base'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Password' className='w-full input input-bordered' value={inputs.password}
                    onChange={(e)=>setInputs({...inputs, password:e.target.value})}
                     />
                </div>

                <div>
                    <label className='label '>
                        <span className='label-text text-base'>Confirm Password</span>
                    </label>
                    <input type="password" placeholder='Confirm Password' className='w-full input input-bordered' value={inputs.confirmPassword}
                    onChange={(e)=>setInputs({...inputs, confirmPassword:e.target.value})}
                    />
                </div>

                 <GenderCheckBox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>

                <Link to="/login"
                    className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Alerady have an account?</Link>

                <div>
                    <button className='btn btn-block mt-2 border border-slate-700' disabled={loading}>
                        {loading? <span className='loading loading-spinner'/>: "Sign Up" }
                    </button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default SignUp