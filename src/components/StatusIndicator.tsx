
import React, { useState, useEffect } from 'react';

interface StatusIndicatorProps {
  isDetecting: boolean;
  facesCount: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isDetecting, facesCount }) => {
  const [statusMessage, setStatusMessage] = useState('Initializing camera...');
  const [statusLevel, setStatusLevel] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  
  useEffect(() => {
    if (!isDetecting) {
      setStatusMessage('Starting face detection...');
      setStatusLevel('info');
    } else if (facesCount === 0) {
      setStatusMessage('No faces detected');
      setStatusLevel('warning');
    } else if (facesCount === 1) {
      setStatusMessage('Face detected');
      setStatusLevel('success');
    } else {
      setStatusMessage(`${facesCount} faces detected`);
      setStatusLevel('success');
    }
  }, [isDetecting, facesCount]);
  
  const statusColors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500'
  };
  
  return (
    <div className="glass-panel py-2 px-4 flex items-center gap-2 animate-slide-up">
      <div className={`h-2 w-2 rounded-full ${statusColors[statusLevel]} animate-pulse-slow`}></div>
      <span className="text-sm font-medium">{statusMessage}</span>
    </div>
  );
};

export default StatusIndicator;
