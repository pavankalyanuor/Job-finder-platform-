import React from 'react';
import { SavedJobs } from '../components/SavedJobs';
export const SavedPage = ({ savedJobs, onSaveToggle }) => {
    return (<div className="flex-1 bg-gray-50 flex flex-col">
      <SavedJobs savedJobs={savedJobs} onSaveToggle={onSaveToggle}/>
    </div>);
};
