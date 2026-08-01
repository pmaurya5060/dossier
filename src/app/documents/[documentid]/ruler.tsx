import {FaCaretDown} from "react-icons/fa";
import { useState,useRef } from "react";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
  e.preventDefault();
  setIsDraggingLeft(true);
};

const handleRightMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
  e.preventDefault();
  setIsDraggingRight(true);
};

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(relativeX, 816)) ;

        if(isDraggingLeft){
          const maxLeftPosition = 816 - rightMargin -100;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        }else if(isDraggingRight){
          const maxRightPosition = 816 - leftMargin +100;
          const newRightPosition = Math.max(816 - rawPosition, 0);
          const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  }; 
  const handleLeftMouseDoubleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setLeftMargin(56);
  }
  const handleRightMouseDoubleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setRightMargin(56);
  }

  return (
    <div 
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    className="w-204 mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
      <div
        id="ruler-container"
        className="h-full w-full relative"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftMouseDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightMouseDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-204">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              const isMajor = marker % 10 === 0;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {isMajor ? (
                    <>
                      <div className="absolute bottom-0 w-px h-3 bg-neutral-500" />
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500">
                        {marker / 10 + 1}
                      </span>
                    </>
                  ) : (
                    <div className="absolute bottom-0 w-px h-1.5 bg-neutral-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps{
    position:number;
    isLeft:boolean;
    isDragging:boolean;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Marker=({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick
}:MarkerProps)=>{
  return(
    <div
      className="absolute top-0 h-full w-4 cursor-ew-resize z-[5] group-ml-2"
      style={{[isLeft?"left":"right"]: `${position}px`}}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
    <FaCaretDown className="absolute top-0 left-1/2 transform -translate-x-1/2  fill-blue-500" />
    <div 
      className="absolute left-1/2 top-4 transform -translate-x-1/2 duration-150"
      style={{
        height:"100vh",
        width:"2px",
        backgroundColor:"#3b82f6", 
        transform:"scaleX(0.5)",
        display:isDragging?"block":"none",
      }}
    />
    </div>
    

  )
}