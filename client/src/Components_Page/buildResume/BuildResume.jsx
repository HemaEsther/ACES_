import useResumeStore from "../../store/resumeStore";
import PersonalInfo from "./components/PersonalInfo";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Preview from "./components/Preview";

export default function BuildResume() {
  const { step, nextStep, prevStep } = useResumeStore();

  const steps = [
    { component: <PersonalInfo />, title: "Personal Info" },
    { component: <Skills />, title: "Skills" },
    { component: <Experience />, title: "Experience" },
    { component: <Projects />, title: "Projects" },
    { component: <Education />, title: "Education" },
    { component: <Preview />, title: "Preview" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
        {/* Progress Bar */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Resume Builder
          </h1>
          <div className="flex items-center justify-between">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index + 1 <= step
                        ? "bg-amber-500 text-gray-900"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-2 text-gray-300">
                    {steps[index].title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-16 mx-2 transition-all duration-300 ${
                      index + 1 < step ? "bg-amber-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="min-h-[400px] flex flex-col justify-between">
            <div>{steps[step - 1].component}</div>
            
            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between gap-4">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  Previous
                </button>
              )}
              {step < steps.length ? (
                <button
                  onClick={nextStep}
                  className="flex-1 py-2 px-4 bg-amber-500 text-gray-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300"
                >
                  Next
                </button>
              ) : (
                <button
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}