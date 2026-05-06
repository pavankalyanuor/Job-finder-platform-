import React, { useState, useEffect } from 'react';
export const GDPRBanner = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const consent = localStorage.getItem('gdpr_consent');
        if (!consent) {
            setShow(true);
        }
    }, []);
    const handleAccept = () => {
        localStorage.setItem('gdpr_consent', 'true');
        setShow(false);
    };
    if (!show)
        return null;
    return (<div className="fixed bottom-0 left-0 right-0 z-[1000] flex flex-wrap items-center justify-between gap-4 bg-gray-900 p-6 text-white shadow-2xl">
      <p className="min-w-[300px] flex-1 text-sm sm:text-base">
        We use essential cookies to ensure you get the best experience on our website and to save your preferences safely in your browser.{' '}
        <a href="#" className="text-indigo-400 underline hover:text-indigo-300">Learn more</a>.
      </p>
      <button onClick={handleAccept} className="shrink-0 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-500">
        Accept
      </button>
    </div>);
};
