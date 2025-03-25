
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center animate-slide-down">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute inset-1 bg-primary/40 rounded-full"></div>
          <div className="absolute inset-2 bg-primary/60 rounded-full"></div>
          <div className="absolute inset-3 bg-primary rounded-full"></div>
        </div>
        <div>
          <h1 className="text-lg font-medium">FaceFlux</h1>
          <div className="text-xs text-muted-foreground">Advanced recognition</div>
        </div>
      </div>
      
      <div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>System active</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
