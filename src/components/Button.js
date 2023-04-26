// import React from 'react'
import spinner from "../images/spinner.svg"
//import Login from "./Login";

const Button = (props) => {
  const { loading, children, onClick } = props;

  return (

    <div className = "flex justify-center">
      <button onClick={onClick} className='bg-[#080f19] flex justify-center w-full md:p-7 mt-12 md:mt-6 lg:mt-0 lg:p-3 mx-auto text-white py-2 md:px-28 text-center rounded' type='submit'>
        {children}
        {loading ? <img className=" w-6 ml-4 " src={spinner} alt="" /> : " "}
      </button>
    </div>
  )
}

export default Button;