import React from 'react'
import AuthDetails from './AuthDetails'

const Navbar = () => {
    return (
        <div>
            <div className='navbar fixed z-10 bg-neutral text-neutral-content'>
                <div className="containerWrap flex justify-between">
                    <a href="#" className="btn btn-ghost normal-case text-xl">let'sChat</a>
                    {/* <button>Logout</button> */}
                </div>
                <AuthDetails />
            </div>
        </div>
    )
}

export default Navbar