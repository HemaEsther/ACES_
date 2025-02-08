// import React from 'react';
import { Button } from "@/components/ui/button"
const Header = () => {
    return (
        <div className='m-10 flex justify-between bg-amber-200 max-w-full p-2'>
            <div className='h-[50px] w-[50px] font-bold text-4xl'>ACES</div>
            <div><Button>Sign Up</Button></div>
        </div>
    );
};

export default Header;