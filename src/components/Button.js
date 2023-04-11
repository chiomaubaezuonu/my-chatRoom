// import React from 'react'
import spinner from "../images/spinner.svg"
//import Login from "./Login";

const Button = (props) => {
  const { loading, children, onClick } = props;

  return (

    <div className>
      <button onClick={onClick} className='flex bg-[#3482F6] justify-between w-[8rem] mx-auto mt-4 mb-4 text-white py-1 px-5 rounded' type='submit'>
        {children}
        {loading ? <img className="ml-6 mr-3 w-6 h-6" src={spinner} alt="" /> : " "}
      </button>
    </div>
  )
}

export default Button;