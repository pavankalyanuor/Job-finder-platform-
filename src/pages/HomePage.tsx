import React from 'react';
import { Hero } from '../components/Hero';
import { Featured } from '../components/Featured';
import { Job } from '../config';

interface HomePageProps {
  savedJobs: Job[];
  onSaveToggle: (job: Job) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ savedJobs, onSaveToggle }) => {
  return (
    <>
      <Hero />
      <Featured savedJobs={savedJobs} onSaveToggle={onSaveToggle} />
    </>
  );
};
