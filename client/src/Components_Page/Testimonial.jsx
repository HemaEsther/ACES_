import { motion } from "framer-motion";
import testimonials from "../data/testimonials";

const Testimonial = () => {
  return (
    <>
      <p className="text-slate-400 font-semibold bg-black text-3xl flex justify-center items-center ">Testimonials</p>
      <div className="relative overflow-hidden bg-black py-10 text-slate-200">
        <motion.div
          className="flex w-full gap-6"
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
              className="min-w-[320px] md:min-w-[380px] bg-gray-900 p-6 rounded-xl shadow-lg text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 mx-auto mb-4 rounded-full"
              />
              <p className="text-gray-400 mb-4">{testimonial.text}</p>
              <h3 className="text-lg font-semibold text-gray-200">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.position}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Testimonial;
