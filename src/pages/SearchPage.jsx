import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchSection } from '../components/SearchSection';
import { searchJobs } from '../api';
export const SearchPage = ({ savedJobs, onSaveToggle }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    // Extract initial query values
    const initialWhat = searchParams.get('what') || '';
    const initialWhere = searchParams.get('where') || '';
    const initialWhatExclude = searchParams.get('what_exclude') || '';
    const initialSalaryMin = searchParams.get('salary_min') || '';
    const initialSortBy = searchParams.get('sort_by') || 'relevance';
    const initialFullTime = searchParams.get('full_time') === '1';
    const initialPermanent = searchParams.get('permanent') === '1';
    // Form local state
    const [inputWhat, setInputWhat] = useState(initialWhat);
    const [inputWhere, setInputWhere] = useState(initialWhere);
    const [inputWhatExclude, setInputWhatExclude] = useState(initialWhatExclude);
    const [inputSalaryMin, setInputSalaryMin] = useState(initialSalaryMin);
    const [inputSortBy, setInputSortBy] = useState(initialSortBy);
    const [inputFullTime, setInputFullTime] = useState(initialFullTime);
    const [inputPermanent, setInputPermanent] = useState(initialPermanent);
    const [searchState, setSearchState] = useState({
        loading: false,
        error: null,
        results: [],
        total: 0,
        hasSearched: false,
    });
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (inputWhat.trim())
            queryParams.set('what', inputWhat.trim());
        if (inputWhere.trim())
            queryParams.set('where', inputWhere.trim());
        if (inputWhatExclude.trim())
            queryParams.set('what_exclude', inputWhatExclude.trim());
        if (inputSalaryMin.trim())
            queryParams.set('salary_min', inputSalaryMin.trim());
        if (inputSortBy !== 'relevance')
            queryParams.set('sort_by', inputSortBy);
        if (inputFullTime)
            queryParams.set('full_time', '1');
        if (inputPermanent)
            queryParams.set('permanent', '1');
        setSearchParams(queryParams);
    };
    useEffect(() => {
        // Sync external URL parameter changes to local form state
        setInputWhat(initialWhat);
        setInputWhere(initialWhere);
        setInputWhatExclude(initialWhatExclude);
        setInputSalaryMin(initialSalaryMin);
        setInputSortBy(initialSortBy);
        setInputFullTime(initialFullTime);
        setInputPermanent(initialPermanent);
        // If no parameters exist, don't execute a search
        if (!initialWhat && !initialWhere && !initialWhatExclude && !initialSalaryMin && !initialFullTime && !initialPermanent && initialSortBy === 'relevance') {
            setSearchState({
                loading: false,
                error: null,
                results: [],
                total: 0,
                hasSearched: false,
            });
            return;
        }
        const performSearch = async () => {
            setSearchState((prev) => ({ ...prev, loading: true, error: null, hasSearched: true }));
            try {
                const fetchParams = { page: 1 };
                if (initialWhat)
                    fetchParams.what = initialWhat;
                if (initialWhere)
                    fetchParams.where = initialWhere;
                if (initialWhatExclude)
                    fetchParams.what_exclude = initialWhatExclude;
                if (initialSalaryMin)
                    fetchParams.salary_min = initialSalaryMin;
                if (initialSortBy !== 'relevance')
                    fetchParams.sort_by = initialSortBy;
                if (initialFullTime)
                    fetchParams.full_time = 1;
                if (initialPermanent)
                    fetchParams.permanent = 1;
                const data = await searchJobs(fetchParams);
                setSearchState({
                    loading: false,
                    error: null,
                    results: data.results || [],
                    total: data.count || 0,
                    hasSearched: true,
                });
            }
            catch (err) {
                setSearchState({
                    loading: false,
                    error: err.message || 'An error occurred during search.',
                    results: [],
                    total: 0,
                    hasSearched: true,
                });
            }
        };
        performSearch();
    }, [searchParams]);
    return (<div className="flex-1 bg-gray-50 py-10 md:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 lg:flex-row">
        
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-80 shrink-0">
          <form onSubmit={handleSearchSubmit} className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-bold text-gray-900 border-b pb-4">Filters</h3>

            <div className="mb-5 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Keywords / Title</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600" placeholder="e.g. Developer" value={inputWhat} onChange={(e) => setInputWhat(e.target.value)}/>
            </div>

            <div className="mb-5 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600" placeholder="e.g. London" value={inputWhere} onChange={(e) => setInputWhere(e.target.value)}/>
            </div>

            <div className="mb-5 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Exclude Keywords</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600" placeholder="e.g. Java, Junior" value={inputWhatExclude} onChange={(e) => setInputWhatExclude(e.target.value)}/>
            </div>

            <div className="mb-5 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Minimum Salary (£)</label>
              <input type="number" className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600" placeholder="e.g. 30000" value={inputSalaryMin} onChange={(e) => setInputSalaryMin(e.target.value)}/>
            </div>

            <div className="mb-5 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Sort By</label>
              <select className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600" value={inputSortBy} onChange={(e) => setInputSortBy(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="salary">Salary</option>
              </select>
            </div>

            <div className="mb-6 flex flex-col gap-3 border-t border-gray-100 pt-5">
              <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-700">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked={inputFullTime} onChange={(e) => setInputFullTime(e.target.checked)}/>
                Full Time Only
              </label>
              <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-700">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked={inputPermanent} onChange={(e) => setInputPermanent(e.target.checked)}/>
                Permanent Only
              </label>
            </div>

            <button type="submit" className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:-translate-y-[1px] hover:bg-indigo-700 hover:shadow-md">
              Apply Filters
            </button>
          </form>
        </aside>

        {/* Right Content Area */}
        <div className="min-w-0 flex-1">
          <SearchSection searchState={searchState} savedJobs={savedJobs} onSaveToggle={onSaveToggle}/>
        </div>

      </div>
    </div>);
};
