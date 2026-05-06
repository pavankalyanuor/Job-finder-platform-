import React from 'react';
import { Hero } from '../components/Hero';
import { Featured } from '../components/Featured';
export const HomePage = ({ savedJobs, onSaveToggle }) => {
    return (<>
      <Hero />
      <Featured savedJobs={savedJobs} onSaveToggle={onSaveToggle}/>
    </>);
};
