
import React from 'react';

interface FaceBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
  confidence?: number;
}

interface FaceDetectionBoxProps {
  box: FaceBox;
  videoWidth: number;
  videoHeight: number;
  containerWidth: number;
  containerHeight: number;
}

const FaceDetectionBox: React.FC<FaceDetectionBoxProps> = ({ 
  box, 
  videoWidth, 
  videoHeight, 
  containerWidth, 
  containerHeight 
}) => {
  // Calculate the position of the box relative to the container
  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;
  
  const styles = {
    top: `${box.top * scaleY}px`,
    right: `${containerWidth - (box.right * scaleX)}px`,
    bottom: `${containerHeight - (box.bottom * scaleY)}px`,
    left: `${box.left * scaleX}px`,
  };
  
  // Calculate confidence level for styling
  const confidenceLevel = box.confidence || 0.7;
  const borderColor = confidenceLevel > 0.8 ? 'border-green-400' : 'border-amber-400';
  
  return (
    <div 
      className={`detection-box ${borderColor} animate-scale-in`}
      style={styles}
    >
      {confidenceLevel > 0.5 && (
        <div className="absolute -top-6 left-0 glass-panel-dark px-2 py-1 text-xs text-white">
          Confidence: {(confidenceLevel * 100).toFixed(0)}%
        </div>
      )}
    </div>
  );
};

export default FaceDetectionBox;
