import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Hero = () => {
    const [what, setWhat] = useState('');
    const [where, setWhere] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (what.trim())
            queryParams.set('what', what.trim());
        if (where.trim())
            queryParams.set('where', where.trim());
        navigate(`/search?${queryParams.toString()}`);
    };
    return (<section id="home" className="bg-indigo-600 py-16 text-center text-white md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Find Your Next Great Opportunity</h1>
        <p className="mb-10 text-lg text-indigo-100 md:text-xl">Search over a million jobs to discover the right role for you.</p>
        
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-[800px] flex-col gap-4 rounded-xl bg-white p-4 shadow-lg md:flex-row md:items-center">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20" placeholder="Job title, keywords, or company" value={what} onChange={(e) => setWhat(e.target.value)} required/>
          </div>
          <div className="relative flex-1">
            <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20" placeholder="Location, e.g., London" value={where} onChange={(e) => setWhere(e.target.value)}/>
          </div>
          <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:-translate-y-[1px] hover:bg-indigo-700 hover:shadow-md md:w-auto">
            Search Jobs
          </button>
        </form>
      </div>
    </section>);
};
