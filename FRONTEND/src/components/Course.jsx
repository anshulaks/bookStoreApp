import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import axios from "axios";
// import list from "../../public/list.json";
import {Link} from "react-router-dom"
function Course() {
  const [book,setBook]=useState([])
  useEffect(() => {
    const getBook=async()=>{
      try{
       const res = await axios.get("http://localhost:4001/book");
       console.log(res.data)
       setBook(res.data);
      }catch(error){
        console.log(error)
      }
    }
    getBook();
  },[]);
  return (
   <>
   <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
    <div className='mt-28 items-center justify-center text-center'>
<h1 className='text-2xl font-semibold md:text-4xl'>We are delighted to have you <span className='text-pink-500'>here! :O</span></h1>

<p className='m-12'>
Discover the foundations of AI through courses that delve into neural networks, natural language processing, computer vision, and robotics. Dive deep into algorithms and statistical methods, mastering the tools and techniques that drive modern AI applications.
</p>
<Link to="/">
<button className='mt -6  bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>
  Back
</button>
</Link>

</div>
<div className='mt-12 grid grid-cols-1 md:grid-cols-4 '>
{
  book.map((item)=>(
    <Cards key={item.id} item={item}/>
  ))
}
</div>
    </div></>
  )
}

export default Course
