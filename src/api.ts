import { CONFIG } from './config';

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export const searchJobs = async (params: any = {}) => {
    const page = params.page || 1;
    
    const apiParams = { ...params };
    delete apiParams.page;

    const queryParams = new URLSearchParams({
        app_id: CONFIG.API_ID,
        app_key: CONFIG.API_KEY,
        results_per_page: CONFIG.RESULTS_PER_PAGE.toString(),
        ...apiParams
    });

    const url = `${CONFIG.BASE_URL}/${page}?${queryParams.toString()}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new ApiError(`API responded with status ${response.status}`, response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};
