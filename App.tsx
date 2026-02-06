
import React from 'react';
import { BrowserRouter, Routes, Route,  } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import FireLayer from './components/FireLayer';
import FlameGradient from './components/FlameGradient';
import { FireProvider } from './context/FireContext';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  console.log(window.location.hash)
  return (
    <FireProvider>
      <BrowserRouter>
        <div className="h-[100dvh] md:min-h-screen relative bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
          
          {/* 1. Global Fixed Flame Background */}
          <FlameGradient />

          {/* 2. Interactive Cursor Fire Layer (Z-40) */}
          <FireLayer />
          
          <Navbar />
          
          {/* 3. Main Content (Z-10) 
              We ensure this layer sits above the gradient but below the cursor fire.
              The components inside will utilize transparency.
          */}
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </FireProvider>
  );
};

export default App;
