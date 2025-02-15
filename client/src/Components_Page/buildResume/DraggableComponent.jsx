import { useDraggable } from "@dnd-kit/core";

const DraggableComponent = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-3 border bg-gray-200 rounded-md cursor-pointer"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
      }}
    >
      {label}
    </div>
  );
};

export default DraggableComponent;
