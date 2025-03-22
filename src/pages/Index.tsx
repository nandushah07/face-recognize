
import React from 'react';
import FaceRecognition from '@/components/FaceRecognition';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/50">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center py-8 md:py-12">
        <div className="container max-w-5xl px-4 mb-12">
          <div className="text-center mb-8 animate-slide-down">
            <h2 className="text-3xl font-semibold tracking-tight mb-2">Real-Time Face Recognition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced face detection with minimal, intuitive design. Simply look at the camera to begin.
            </p>
          </div>
          
          <FaceRecognition />
          
          <div className="mt-12 text-center text-sm text-muted-foreground animate-fade-in">
            <p>For demonstration purposes, face detection is simulated. In a production environment, this would use a real face detection API.</p>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border/40 bg-secondary/30 backdrop-blur-subtle">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© 2023 FaceFlux Recognition</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
