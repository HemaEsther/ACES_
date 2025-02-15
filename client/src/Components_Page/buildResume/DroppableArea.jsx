import { useDroppable } from "@dnd-kit/core";
import ResumeSection from "./ResumeSection";

const DroppableArea = ({ components }) => {
  const { setNodeRef } = useDroppable({ id: "resume-area" });

  return (
    <div
      ref={setNodeRef}
      className="h-full p-6 bg-white border border-gray-400 shadow-md max-w-[700px] mx-auto"
    >
      <h1 className="text-2xl font-bold text-center mb-4">John Doe</h1>
      <p className="text-sm text-center text-gray-600">Frontend Developer | MERN Stack | Open to Work</p>
      <hr className="my-4 border-gray-400" />

      {components.length === 0 ? (
        <p className="text-gray-500 text-center">Drag components here...</p>
      ) : (
        components.map((comp, index) => (
          <ResumeSection key={index} type={comp.id} content={comp.content} />
        ))
      )}
    </div>
  );
};

export default DroppableArea;
