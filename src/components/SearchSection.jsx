import React from 'react';
import { JobCard } from './JobCard';
export const SearchSection = ({ searchState, savedJobs, onSaveToggle }) => {
    const { loading, error, results, total, hasSearched } = searchState;
    return (<div id="search" className="flex-1">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Job Listings</h2>
          <p className="text-gray-600">Explore live job listings powered by Adzuna.</p>
        </div>
        <p className="font-medium text-gray-500">
          {loading ? 'Loading results...' : error ? 'Error loading results' : hasSearched ? `Showing ${results.length} of ${total} jobs` : 'No results yet.'}
        </p>
      </div>

      {loading ? (<div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="spinner"></div>
          <p>Searching for jobs...</p>
        </div>) : error ? (<div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-red-900">
          <p className="font-bold">Failed to load search results.</p>
          <p>{error}</p>
        </div>) : !hasSearched || results.length === 0 ? (<div className="rounded-xl bg-white p-16 text-center text-gray-500 shadow-sm ring-1 ring-gray-100">
          <i className="fa-solid fa-search mb-4 text-5xl text-gray-300"></i>
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            {hasSearched ? 'No jobs found' : 'Search for jobs'}
          </h3>
          <p>{hasSearched ? 'Try adjusting your search filters to find more jobs.' : 'Use the search form to explore live job listings.'}</p>
        </div>) : (<div className="grid gap-6">
          {results.map(job => (<JobCard key={job.id} job={job} isSaved={savedJobs.some(s => s.id === job.id)} onSaveToggle={onSaveToggle}/>))}
        </div>)}
    </div>);
};
