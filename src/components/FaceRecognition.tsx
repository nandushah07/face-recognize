
import React, { useRef, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import FaceDetectionBox from './FaceDetectionBox';
import StatusIndicator from './StatusIndicator';
import CameraControls from './CameraControls';
import { useIsMobile } from '@/hooks/use-mobile';

interface Box {
  top: number;
  right: number;
  bottom: number;
  left: number;
  confidence?: number;
}

const FaceRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isActive, setIsActive] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  
  const isMobile = useIsMobile();

  // Start the webcam
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 } 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          
          setVideoSize({
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight
          });
          
          toast({
            title: "Camera activated",
            description: "Face detection is now running.",
            duration: 3000,
          });
          
          // Update container size
          if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setContainerSize({ width, height });
          }
          
          setIsDetecting(true);
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
        toast({
          title: "Camera Error",
          description: "Could not access webcam. Please grant permission and refresh.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };
    
    startWebcam();
    
    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // Implement face detection (simulated for now)
  useEffect(() => {
    if (!isActive || !isDetecting) return;
    
    const detectFaces = () => {
      // Simulate face detection with random boxes
      // In a real implementation, you would use a face detection library here
      const chance = Math.random();
      
      if (videoRef.current && canvasRef.current && containerRef.current) {
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        
        if (chance < 0.2) {
          // No faces
          setBoxes([]);
        } else if (chance < 0.7) {
          // One face (center-ish)
          const centerX = videoWidth / 2 + (Math.random() * 100 - 50);
          const centerY = videoHeight / 2 + (Math.random() * 100 - 50);
          const boxWidth = videoWidth / 3 + (Math.random() * 50);
          const boxHeight = videoHeight / 3 + (Math.random() * 50);
          
          setBoxes([{
            left: centerX - boxWidth / 2,
            top: centerY - boxHeight / 2,
            right: centerX + boxWidth / 2,
            bottom: centerY + boxHeight / 2,
            confidence: 0.8 + (Math.random() * 0.2)
          }]);
        } else {
          // Multiple faces
          const numFaces = Math.floor(Math.random() * 3) + 1;
          const newBoxes = [];
          
          for (let i = 0; i < numFaces; i++) {
            const centerX = (i + 1) * videoWidth / (numFaces + 1) + (Math.random() * 100 - 50);
            const centerY = videoHeight / 2 + (Math.random() * 100 - 50);
            const boxWidth = videoWidth / 4 + (Math.random() * 50);
            const boxHeight = videoHeight / 4 + (Math.random() * 50);
            
            newBoxes.push({
              left: centerX - boxWidth / 2,
              top: centerY - boxHeight / 2,
              right: centerX + boxWidth / 2,
              bottom: centerY + boxHeight / 2,
              confidence: 0.6 + (Math.random() * 0.4)
            });
          }
          
          setBoxes(newBoxes);
        }
      }
    };
    
    const intervalId = setInterval(detectFaces, 2000);
    return () => clearInterval(intervalId);
  }, [isActive, isDetecting]);
  
  // Listen for window resize to update container size
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleDetection = () => {
    setIsActive(prev => !prev);
    
    toast({
      title: isActive ? "Detection paused" : "Detection resumed",
      description: isActive ? "Face recognition is now paused." : "Face recognition is now active.",
      duration: 3000,
    });
  };
  
  const resetDetection = () => {
    setBoxes([]);
    setIsActive(true);
    
    toast({
      title: "Detection reset",
      description: "Face recognition has been reset.",
      duration: 3000,
    });
  };
  
  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="camera-container animate-fade-in" ref={containerRef}>
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover"
          muted
          playsInline
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        
        {/* Render face detection boxes */}
        {boxes.map((box, index) => (
          <FaceDetectionBox 
            key={index}
            box={box}
            videoWidth={videoSize.width}
            videoHeight={videoSize.height}
            containerWidth={containerSize.width}
            containerHeight={containerSize.height}
          />
        ))}
        
        {/* Overlay for inactive state */}
        {!isActive && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-xl font-medium animate-pulse-slow">Detection Paused</div>
          </div>
        )}
      </div>
      
      <div className="mt-4 w-full max-w-3xl flex flex-col md:flex-row justify-between items-center gap-4">
        <StatusIndicator 
          isDetecting={isDetecting} 
          facesCount={boxes.length} 
        />
        
        <CameraControls 
          isActive={isActive} 
          onToggle={toggleDetection} 
          onReset={resetDetection} 
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
