import React from 'react';
import { Job } from '../config';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onSaveToggle: (job: Job) => void;
  isSavedView?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onSaveToggle, isSavedView }) => {
  const formatSalary = () => {
    if (job.salary_min && job.salary_max) {
      return `£${Math.round(job.salary_min).toLocaleString()} - £${Math.round(job.salary_max).toLocaleString()} per year`;
    }
    return 'Salary not specified';
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md">
      <div>
        <div className="mb-4">
          <h3 className="mb-1 text-xl font-bold text-gray-900 leading-tight">{job.title}</h3>
          {job.company?.display_name && (
            <p className="text-lg font-medium text-gray-600">{job.company.display_name}</p>
          )}
        </div>
        
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          <span className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot"></i> {job.location?.display_name || 'Location not specified'}</span>
          <span className="flex items-center gap-1.5"><i className="fa-solid fa-money-bill"></i> {formatSalary()}</span>
          {!isSavedView && (
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-calendar"></i> Posted {formatDate(job.created)}</span>
          )}
        </div>
        
        {!isSavedView && (
          <p className="mb-6 text-gray-600">
            {(job.description || '').substring(0, 160)}...
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <a 
          href={job.redirect_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-400"
        >
          Apply on Adzuna
        </a>
        <button 
          type="button" 
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            isSavedView 
              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
          onClick={() => onSaveToggle(job)}
        >
          {isSavedView ? (
            'Remove'
          ) : (
            <>
              <i className={`${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark`}></i> {isSaved ? 'Saved' : 'Save'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
