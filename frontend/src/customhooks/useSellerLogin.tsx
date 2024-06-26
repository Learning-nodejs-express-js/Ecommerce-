import { useState } from "react"
import useSeller from "./useSeller";


export const useSellerLogin = () => {
  const [error,setError]=useState("");
  const [isloading,setisloading]=useState(false);
  const {dispatch}=useSeller();

  const sellerlogin=async(email:string,password:string)=>{
    try{
        setisloading(true);
        setError("")
        
        const response=await fetch(import.meta.env.VITE_SELLER_LOGIN_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        const sellerinfo=await response.json();

        if(response.ok){  
          console.log(sellerinfo)
        dispatch({type:"LOGIN",payload:sellerinfo});  
        }
        else{
          setError(sellerinfo.message);
        }
        
    }
    catch(err){
      setError("Something went wrong with server");
    }
    setisloading(false)
  }

  return [error,isloading,sellerlogin]
}