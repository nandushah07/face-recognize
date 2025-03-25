
import React from 'react';

interface FaceBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
  confidence?: number;
  age?: string;
  gender?: { type: 'male' | 'female', confidence: number };
  emotion?: { type: 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised', confidence: number };
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

  // Get emoji for emotion
  const getEmotionEmoji = (emotion?: { type: string, confidence: number }) => {
    if (!emotion) return "😐";
    
    switch (emotion.type) {
      case 'happy': return "😊";
      case 'sad': return "😔";
      case 'angry': return "😠";
      case 'surprised': return "😲";
      default: return "😐";
    }
  };
  
  return (
    <div 
      className={`detection-box ${borderColor} animate-scale-in`}
      style={styles}
    >
      <div className="absolute -top-24 left-0 glass-panel-dark px-3 py-2 text-xs text-white flex flex-col gap-1 min-w-[120px]">
        <div className="flex justify-between items-center">
          <span>Match:</span>
          <span>{(confidenceLevel * 100).toFixed(0)}%</span>
        </div>
        
        {box.age && (
          <div className="flex justify-between items-center">
            <span>Age:</span>
            <span>{box.age}</span>
          </div>
        )}
        
        {box.gender && (
          <div className="flex justify-between items-center">
            <span>Gender:</span>
            <span>{box.gender.type} ({(box.gender.confidence * 100).toFixed(0)}%)</span>
          </div>
        )}
        
        {box.emotion && (
          <div className="flex justify-between items-center">
            <span>Mood:</span>
            <span>{getEmotionEmoji(box.emotion)} {box.emotion.type}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceDetectionBox;
