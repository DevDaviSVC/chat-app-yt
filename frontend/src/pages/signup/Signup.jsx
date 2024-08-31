import React, { useEffect, useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link, useNavigate } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';
import { useAuthContext } from '../../context/AuthContext';

export default function Signup() {
  const { loading, signup } = useSignup();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser]);

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input 
              type="text" 
              placeholder='John Doe' 
              className='input input-bordered w-full h-10'
              value={inputs.fullName}
              onChange={(e) => {setInputs({...inputs, fullName: e.target.value})}}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input 
              type="text" 
              placeholder='johndoe' 
              className='input input-bordered h-10 w-full' 
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input 
              type="password"
              placeholder='Password'
              className='input input-bordered w-full h-10' 
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input 
              type="password"
              placeholder='Confirm Password'
              className='input input-bordered w-full h-10' 
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
