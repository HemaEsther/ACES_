import { Button } from '../components/ui/button';

const Hero = () => {
    return (
        <div className='h-screen overflow-hidden bg-black text-slate-200 flex justify-center'>
            <div className='w-[75%] mx-auto'> {/* This centers the content and limits width to 70% */}
                
                {/* First Section (Image Left, Text Right) */}
                <div className=' flex flex-col md:flex-row mt-5 h-auto overflow-hidden justify-center items-center'>
                    <div className='w-full md:w-1/2 flex justify-center items-center'>
                        <div className='h-60 w-60'>
                            <img
                                className="max-w-full h-auto rounded-md"
                                src="./src/assets/resume.jpeg"
                                alt="resume"
                            />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 mt-5 md:mt-0 flex flex-col justify-center items-center 
                      m-2 p-2 shadow-md 
                    rounded-md text-center hover:shadow-lg'>
                        <q>Craft the Perfect Resume, Effortlessly.</q>
                        <p className='mt-4 font-light text-sm'>
                            Stop struggling with resume formatting and content.
                            Our AI-powered resume builder takes the guesswork out of creating a standout resume.
                            Simply input your work experience and skills, and our intelligent algorithms will
                            generate a professional, ATS-friendly resume tailored to your target jobs.
                        </p>
                        <Button variant="secondary" className='mt-6 '>Build Resume</Button>
                    </div>
                </div>

                {/* Second Section (Image Right, Text Left) */}
                <div className='flex flex-col md:flex-row mt-10 h-auto overflow-hidden justify-center items-center'>
                    <div className='w-full md:w-1/2 mt-5 md:mt-0 order-2 
                    md:order-1 flex flex-col justify-center items-center 
                     font-black m-2 p-2 shadow-md
                    rounded-md text-center hover:shadow-xl'>
                        <q className='font-bold'>
                            Shine through the ATS. Get checked now.
                        </q>
                        <p className='mt-4 font-light text-sm'>
                            Leverage the power of AI to conquer the ATS.
                            Our cutting-edge ATS checker goes beyond simple keyword
                            analysis. Using advanced natural language processing,
                            our AI understands the nuances of language and identifies
                            the connections between your experience and the job description.
                        </p>
                        <Button variant='secondary' className='mt-2'>Scan My ATS</Button>
                    </div>
                    <div className='w-full md:w-1/2 order-1 md:order-2 flex justify-center 
                    items-center'>
                        <div className='h-60 w-60'>
                            <img className='max-w-full h-auto rounded-md'
                            src="./src/assets/ATS.jpeg" alt="ats" />
                        </div>
                    </div>
                </div>

            </div> {/* End of Centered Container */}
        </div>
    );
};

export default Hero;
