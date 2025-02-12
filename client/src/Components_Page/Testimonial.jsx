import { motion } from "framer-motion";
import testimonials from "../data/testimonials";

const Testimonial = () => {
  return (
    <>
      <div className=" bg-background flex flex-col py-10 md:py-24  items-center overflow-hidden">
        <h2 className="text-3xl leading-normal md:text-5xl font-medium mb-10 sm:mb-6 text-center">Reviews</h2>
        <div className="relative overflow-hidden bg-white dark:bg-black py-10 text-slate-200">
          <motion.div
            className="flex w-full gap-6 "
            animate={{ x: ["0%", "-70%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 15, // Adjust speed
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className=" border min-w-[320px] md:min-w-[380px] bg-gray-100 dark:bg-black p-6 rounded-xl shadow-lg text-center"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 mx-auto mb-4 rounded-full"
                />
                <p className="text-gray-600 dark:text-slate-200 mb-4">
                  {testimonial.text}
                </p>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white ">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
