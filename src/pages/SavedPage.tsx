import React from 'react';
import { SavedJobs } from '../components/SavedJobs';
import { Job } from '../config';

interface SavedPageProps {
  savedJobs: Job[];
  onSaveToggle: (job: Job) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({ savedJobs, onSaveToggle }) => {
  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      <SavedJobs savedJobs={savedJobs} onSaveToggle={onSaveToggle} />
    </div>
  );
};
