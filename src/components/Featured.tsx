import React, { useEffect, useState } from 'react';
import { JobCard } from './JobCard';
import { Job } from '../config';
import { searchJobs } from '../api';

interface FeaturedProps {
  savedJobs: Job[];
  onSaveToggle: (job: Job) => void;
}

export const Featured: React.FC<FeaturedProps> = ({ savedJobs, onSaveToggle }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await searchJobs({ what: 'developer', results_per_page: 3 });
        setJobs(data.results || []);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section id="featured" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 border-b-2 border-indigo-600 inline-block pb-2">Featured Jobs</h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="spinner"></div>
            <p>Loading featured jobs...</p>
          </div>
        ) : error ? (
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-red-900">
            <p className="font-bold">Error loading featured jobs.</p>
            <p>Please check your API configuration or network connection.</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center text-gray-500 shadow-sm text-lg">
            No featured jobs found right now.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                isSaved={savedJobs.some(s => s.id === job.id)} 
                onSaveToggle={onSaveToggle} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
