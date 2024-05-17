import React from 'react';
import { Link } from "react-router-dom";
import Login from './Login';
import { useForm } from "react-hook-form";
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
    }
    await axios.post("http://localhost:4001/user/signup",userInfo)
      .then((res)=>{
        console.log(res.data);
        if(res.data){
          toast.success("Signup Success!");
        }       localStorage.setItem("Users",JSON.stringify(res.data.user))

          navigate('/'); 
      }).catch((err)=>{
        if(err.response){
          console.log(err);
          toast.error("Error:" +err.response.data.message)
        }
      })
  };

  // Handle showing the login modal
  const handleLoginClick = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <div className="w-[600px]">
          <form onSubmit={handleSubmit(onSubmit)}> {/* Corrected the form to handle submit */}
            {/* Button in form, will not close the modal, just for redirection */}
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            <h3 className="font-bold text-lg">SignUp</h3>
            <div className='mt-4 space-y-2'>
              <span>Name</span>
              <br/>
              <input type="text"
                     placeholder='Enter your full name'
                     className='w-80 px-3 py-1 border rounded-md outline-none'
                     {...register("fullname",{ required: true })}  // React Hook Form registration for name (optional validation can be added)
              />
              <br></br>
              {errors.fullname && (
                <span className='text-red-500'>This field is required</span>
              )}
            </div>
            {/* Email */}
            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br/>
              <input type="email"
                     placeholder='Enter your email address'
                     className='w-80 px-3 py-1 border rounded-md outline-none'
                     {...register("email", { required: "This field is required" })}  // Corrected validation message
              />
              <br />
              {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
            </div>
            <div className='mt-4 space-y-2'>
              <span>Password</span>
              <br/>
              <input type="password"
                     placeholder='Enter your password'
                     className='w-80 px-3 py-1 border rounded-md outline-none'
                     {...register("password", { required: "This field is required" })}  // Corrected validation message
              />
              <br />
              {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
              <div className='flex justify-around mt-4'>
                <button type="submit" className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-300'>SIGNUP</button>
                <p>Have an account?{" "}
                  <button type="button" className='underline text-blue-500 cursor-pointer' onClick={handleLoginClick}>
                    Login
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Login dialog is conditionally rendered or managed via external component depending on architectural choice */}
      <Login />
    </>
  );
}

export default Signup;
