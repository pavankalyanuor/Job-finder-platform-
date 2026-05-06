// App Configuration
export const CONFIG = {
    API_ID: 'a9a2cba7', 
    API_KEY: '20ea78f87cd6221460f03060018918f6',
    BASE_URL: 'https://api.adzuna.com/v1/api/jobs/gb/search',
    RESULTS_PER_PAGE: 10
};

export interface Job {
    id: string | number;
    title: string;
    description?: string;
    redirect_url: string;
    created: string;
    salary_min?: number;
    salary_max?: number;
    location?: { display_name: string };
    company?: { display_name: string };
}
