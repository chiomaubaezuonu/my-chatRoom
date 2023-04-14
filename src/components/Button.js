// import React from 'react'
import spinner from "../images/spinner.svg"
//import Login from "./Login";

const Button = (props) => {
  const { loading, children, onClick } = props;

  return (

    <div className = "flex justify-center">
      <button onClick={onClick} className='bg-[#080f19] w-full mx-auto mt-8 mb-4  text-white py-2 md:px-32 text-center rounded' type='submit'>
        {children}
        {loading ? <img className="ml-6 mr-3 w-6 h-6" src={spinner} alt="" /> : " "}
      </button>
    </div>
  )
}

export default Button;