// import React from 'react';

// const Hero = () => {
//     return (
//         <>
//         <div className='h-screen bg-slate-500'>
//              <div className='flex ml-10 mr-10 h-auto'>
//                 <div className='h-[50%]'>
//                     <img className='w-[300px]'
//                     src="./src/assets/logo.gif" alt="" />
//                 </div>
//                 <div className='mt-40 flex-2 w-2/3 font-mono font-black m-2 p-2 min-h-full justify-start
//                 '>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Nulla magnam adipisci delectus consequatur consequuntur
//                     asperiores veniam harum porro, debitis maiores veritatis
//                     excepturi vitae id.Libero commodi nam suscipit at iusto.
//                 </div>
//             </div>
//             <div className='flex ml-10 mr-10 h-auto'>
//                 <div className='mt-40 flex-2 w-2/3 font-mono font-black m-2 p-2 h-screen justify-start'
//                 >
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Nulla magnam adipisci delectus consequatur consequuntur
//                     asperiores veniam harum porro, debitis maiores veritatis
//                     excepturi vitae id.Libero commodi nam suscipit at iusto.
//                 </div>
//                 <div>
//                 <img className='w-[300px]'
//                 src="./src/assets/logo.gif" alt="" />
//                 </div>
//             </div>
//         </div>
           
//         </>
//     );
// };

// export default Hero;

import React from 'react';

const Hero = () => {
    return (
        <>
            <div className='h-screen overflow-hidden bg-slate-500'>
                <div className='flex mt-5 ml-10 mr-10 h-auto overflow-hidden'>
                    <div className='h-[50%]'>
                        <img className='w-[300px]' src="./src/assets/logo.gif" alt="logo" />
                    </div>
                    <div className='mt-40 flex-2 w-2/3 font-mono font-black m-2 p-2 min-h-full justify-start'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla magnam adipisci delectus consequatur consequuntur
                        asperiores veniam harum porro, debitis maiores veritatis
                        excepturi vitae id.Libero commodi nam suscipit at iusto.
                    </div>
                </div>
                <div className='flex ml-10 mr-10 h-auto overflow-hidden'>
                    <div className='mt-40 flex-2 w-2/3 font-mono font-black m-2 p-2 h-screen justify-start'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla magnam adipisci delectus consequatur consequuntur
                        asperiores veniam harum porro, debitis maiores veritatis
                        excepturi vitae id.Libero commodi nam suscipit at iusto.
                    </div>
                    <div>
                        <img className='w-[300px]' src="./src/assets/logo.gif" alt="logo" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
