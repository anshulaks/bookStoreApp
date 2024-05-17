import React from 'react'
import { useAuth } from '../../context/AuthProvider'
import toast from 'react-hot-toast'

function Logout() {
    const [authUser, setAuthUser]=useAuth()
    const handleLogOut = () =>{
        try{
            setAuthUser({
                ...authUser,
                user:null
            })
            localStorage.removeItem("Users")
            toast.success("Logout Success")
            setTimeout (()=>{
                
            window.location.reload()
            },3000)
        }
        catch(error){
            toast.error("Logout Failed")
        }
        setTimeout(()=>{},3000)
    }
  return (
    <div>
      <button className='px-3 py-2 bg-red-400 rounded-md cursor-pointer'
        onClick={handleLogOut}>
        Logout
      </button>
    </div>
  )
}

export default Logout
