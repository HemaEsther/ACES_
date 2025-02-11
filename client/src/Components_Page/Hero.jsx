import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useState } from 'react';

const Hero = () => {
    const navigate = useNavigate();
    const [showTypewriter, setShowTypewriter] = useState(true);

    return (
        <motion.div 
            className='w-[75%] m-auto text-center flex flex-col items-center justify-center h-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className='text-5xl font-bold text-black dark:text-white'>
                {showTypewriter ? (
                    <Typewriter
                        words={['AI-Powered Resume Builder & ATS Checker']}
                        loop={false}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        onDone={() => setShowTypewriter(false)}
                    />
                ) : (
                    'AI-Powered Resume Builder & ATS Checker'
                )}
            </h1>
            <p className='mt-4 text-lg text-gray-700 dark:text-gray-300'>
                Build a professional resume in minutes and check its ATS compatibility effortlessly.
            </p>
            <div className='mt-6 flex gap-6'>
                <Button 
                    className='px-6 py-3 text-lg font-semibold rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700'
                    onClick={() => navigate('/login')}
                >
                    Build Resume
                </Button>
                <Button 
                    className='px-6 py-3 text-lg font-semibold rounded-lg shadow-md bg-green-600 text-white hover:bg-green-700'
                    onClick={() => navigate('/login')}
                >
                    Check ATS Score
                </Button>
            </div>
        </motion.div>
    );
};

export default Hero;
