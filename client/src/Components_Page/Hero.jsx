import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ats from '../assets/ats.png';
import resume_ from '../assets/resume_.png';

const Hero = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
    };

    return (
        <motion.div
            className='md:h-screen mt-20 overflow-hidden bg-white dark:bg-black text-black dark:text-slate-200 flex justify-center'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className='container mx-auto px-4 md:px-0'>
                {/* First Section */}
                <motion.div
                    className='flex flex-col md:flex-row mt-5 h-auto overflow-hidden justify-center items-center'
                    variants={itemVariants}
                >
                    <motion.div className='w-full md:w-1/2 flex justify-center items-center' variants={itemVariants}>
                        <div className='h-60 w-60 overflow-hidden rounded-md'>
                            <motion.img
                                className='max-w-full h-auto rounded-md object-cover'
                                src={resume_}
                                alt='resume'
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        className='w-full md:w-1/2 mt-5 md:mt-0 flex flex-col justify-center items-center m-2 p-2 shadow-md rounded-md text-center hover:shadow-lg'
                        variants={itemVariants}
                    >
                        <q>Craft the Perfect Resume, Effortlessly.</q>
                        <p className='mt-4 font-light text-sm md:block hidden'>
                            Stop struggling with resume formatting and content. Our AI-powered resume builder takes the guesswork out of creating a standout resume.
                        </p>
                        <Button onClick={() => navigate('/login')} variant='secondary' className='mt-6'>
                            Build Resume
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Second Section */}
                <motion.div
                    className='flex flex-col md:flex-row mt-10 h-auto overflow-hidden justify-center items-center'
                    variants={itemVariants}
                >
                    <motion.div
                        className='w-full md:w-1/2 mt-5 md:mt-0 order-2 md:order-1 flex flex-col justify-center items-center font-black m-2 p-2 shadow-md rounded-md text-center hover:shadow-xl'
                        variants={itemVariants}
                    >
                        <q>Shine through the ATS. Get checked now.</q>
                        <p className='mt-4 font-light text-sm'>
                            Leverage the power of AI to conquer the ATS. Our AI understands the nuances of language and identifies the connections between your experience and job descriptions.
                        </p>
                        <Button onClick={() => navigate('/login')} variant='destructive' className='mt-6'>
                            Scan My ATS
                        </Button>
                    </motion.div>
                    <motion.div className='w-full md:w-1/2 order-1 md:order-2 flex justify-center items-center' variants={itemVariants}>
                        <div className='h-60 w-60 overflow-hidden rounded-md'>
                            <motion.img
                                className='max-w-full h-auto rounded-md object-cover'
                                src={ats}
                                alt='ATS'
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Hero;