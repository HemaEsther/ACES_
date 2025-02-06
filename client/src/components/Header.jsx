import React from 'react';
const Header = () => {
    return (
        <div className='flex justify-between bg-amber-200 max-w-full p-2'>
            <div className='h-[50px] w-[50px]'><img src="src/assets/Logo.png" alt="logo" /></div>
            <div className='text-4xl font-semibold px-2 py-1.5  rounded-b-m'>
                Sign Up
            </div> 
        </div>
    );
};

export default Header;