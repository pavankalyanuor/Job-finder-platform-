import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { GDPRBanner } from './components/GDPRBanner';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { SavedPage } from './pages/SavedPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
function App() {
    const [savedJobs, setSavedJobs] = useState([]);
    // Load saved jobs from local storage
    useEffect(() => {
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
            try {
                setSavedJobs(JSON.parse(saved));
            }
            catch (e) {
                console.error('Error parsing saved jobs', e);
            }
        }
    }, []);
    const handleSaveToggle = (job) => {
        let newSaved;
        if (savedJobs.some((s) => s.id === job.id)) {
            // Remove
            newSaved = savedJobs.filter((s) => s.id !== job.id);
        }
        else {
            // Save
            newSaved = [...savedJobs, job];
        }
        setSavedJobs(newSaved);
        localStorage.setItem('savedJobs', JSON.stringify(newSaved));
    };
    return (<BrowserRouter>
      <Navbar savedCount={savedJobs.length}/>
      <main className="flex-1 max-w-full overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage savedJobs={savedJobs} onSaveToggle={handleSaveToggle}/>}/>
          <Route path="/search" element={<SearchPage savedJobs={savedJobs} onSaveToggle={handleSaveToggle}/>}/>
          <Route path="/saved" element={<SavedPage savedJobs={savedJobs} onSaveToggle={handleSaveToggle}/>}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
        </Routes>
      </main>
      <Footer />
      <GDPRBanner />
    </BrowserRouter>);
}
export default App;
