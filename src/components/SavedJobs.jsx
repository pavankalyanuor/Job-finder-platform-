import React from 'react';
import { JobCard } from './JobCard';
export const SavedJobs = ({ savedJobs, onSaveToggle }) => {
    return (<section id="saved" className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-8 flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-indigo-600 pb-2 -mb-[18px]">Saved Jobs</h2>
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-bold text-white shadow-sm">{savedJobs.length}</span>
        </div>

        {savedJobs.length === 0 ? (<div className="rounded-xl bg-white p-16 text-center text-gray-500 shadow-sm">
            <i className="fa-solid fa-bookmark mb-4 text-5xl text-gray-300"></i>
            <h3 className="mb-2 text-xl font-bold text-gray-800">No saved jobs yet</h3>
            <p>Click the bookmark icon on any job card to save a role for later.</p>
          </div>) : (<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedJobs.map(job => (<JobCard key={`saved-${job.id}`} job={job} isSaved={true} onSaveToggle={onSaveToggle} isSavedView={true}/>))}
          </div>)}
      </div>
    </section>);
};
