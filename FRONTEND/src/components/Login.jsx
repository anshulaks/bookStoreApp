import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

// const express = require('express'); 
// const app = express();

// app.use(express.json());  // Ensure this middleware is setup before your route handlers

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo={
      
      email:data.email,
      password:data.password,
    }
    console.log("Sending:", JSON.stringify(userInfo));
    await axios.post("http://localhost:4001/user/login",userInfo)
      .then((res)=>{
        console.log(res.data);
        if(res.data){
          toast.success("Login Success!")
          setTimeout (() => {
            
            document.getElementById("my_modal_3").close();
            window.location.reload()
            localStorage.setItem("Users",JSON.stringify(res.data.user))
          }, 3000)
        
        }
        
      }).catch((err)=>{
        if(err.response){
          console.log(err);
          toast.error("Error:" +err.response.data.message)
          setTimeout(()=>{},3000)
        }
      })
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Move the close button outside of the form */}
            <h3 className="font-bold text-lg">Login to your account</h3>
            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br/>
              <input type="email"
                     placeholder='Your Email Address'
                     className='w-80 px-3 py-1 border rounded-md outline-none'
                     {...register("email", { required: true })}  // React Hook Form registration
              />              <br/>
               {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
            </div>
            {/* Password field */}
            <div className='mt-4 space-y-2'>
              <span>Password</span>
              <br/>
              <input type="password"
                     placeholder='Enter your password'
                     className='w-80 px-3 py-1 border rounded-md outline-none'
                     {...register("password", { required: true })}  // React Hook Form registration
              />
                            <br/>
               {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
              <div className='flex justify-around mt-4'>
                <button type="submit" className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration:300'>LOGIN</button>
                <p>Not registered? {" "}
                  <Link to="/signup" className='underline text-blue-500 cursor-pointer'>
                    SignUp
                  </Link>{" "}
                </p>
              </div>
            </div>
          </form>
          {/* Close button placed outside the form so it doesn't interfere with submission */}
          <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
