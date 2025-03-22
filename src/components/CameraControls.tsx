
import React from 'react';
import { Button } from "@/components/ui/button";
import { CameraIcon, PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react';

interface CameraControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({ isActive, onToggle, onReset }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4 animate-slide-up">
      <Button 
        variant="outline" 
        size="sm" 
        className="glass-button"
        onClick={onToggle}
      >
        {isActive ? (
          <>
            <PauseIcon className="mr-2 h-4 w-4" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <PlayIcon className="mr-2 h-4 w-4" />
            <span>Resume</span>
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="glass-button"
        onClick={onReset}
      >
        <RotateCcwIcon className="mr-2 h-4 w-4" />
        <span>Reset</span>
      </Button>
    </div>
  );
};

export default CameraControls;
