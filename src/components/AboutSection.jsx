import React from 'react';
export const AboutSection = () => {
    return (<section id="about" className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-[800px] px-6">
        <h1 className="mb-8 text-4xl font-bold text-indigo-600">About JobFinder</h1>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          JobFinder is a modern web application that loads real-time job listings from the Adzuna API. 
          It provides a simple search experience with featured roles, search results, and saved jobs—rebuilt 
          with React and Tailwind CSS for speed and elegance.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-md ring-1 ring-gray-100">
            <h3 className="mb-3 text-xl font-bold text-gray-900">Our Mission</h3>
            <p className="text-gray-600">To connect talented individuals with great companies through an intuitive and responsive job search experience.</p>
          </div>
          <div className="rounded-xl bg-white p-8 shadow-md ring-1 ring-gray-100">
            <h3 className="mb-3 text-xl font-bold text-gray-900">Our Vision</h3>
            <p className="text-gray-600">A website where finding the next opportunity is fast, transparent, and enjoyable on any device.</p>
          </div>
        </div>
      </div>
    </section>);
};
