import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { componentsList } from "./componentList";
import DraggableComponent from "./DraggableComponent";
import DroppableArea from "./DroppableArea";

const BuildResume = () => {
  const [resumeComponents, setResumeComponents] = useState([]);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over && over.id === "resume-area") {
      const draggedComponent = componentsList.find(
        (comp) => comp.id === active.id
      );
      setResumeComponents((prev) => [...prev, draggedComponent]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen p-6 gap-6">
        {/* Left Side - Draggable Components */}
        <div className="w-1/2 p-4 border-r border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Available Sections</h2>
          <div className="space-y-3">
            {componentsList.map((comp) => (
              <DraggableComponent key={comp.id} id={comp.id} label={comp.label} />
            ))}
          </div>
        </div>

        {/* Right Side - Resume Preview */}
        <div className="w-1/2 p-4">
          <h2 className="text-lg font-semibold mb-4">Resume Preview</h2>
          <DroppableArea components={resumeComponents} />
        </div>
      </div>
    </DndContext>
  );
};

export default BuildResume;
