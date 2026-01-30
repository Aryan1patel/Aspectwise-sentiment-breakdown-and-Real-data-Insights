const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ABSAResult {
    [aspect: string]: {
        sentiment: 'positive' | 'negative' | 'neutral';
        confidence: number;
        sentence: string;
    };
}

export interface AspectDistribution {
    aspect: string;
    positive?: number;
    negative?: number;
    neutral?: number;
}

export interface RatingMismatch {
    mismatch_percentage: number;
    top_aspects: Array<{
        aspect?: string;
        index?: string;
        count: number;
    }>;
}

export interface RootCauses {
    [aspect: string]: Array<[string, number]>;
}

export const api = {
    async analyzeReview(review: string): Promise<ABSAResult> {
        const response = await fetch(`${API_BASE_URL}/absa`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ review }),
        });

        if (!response.ok) {
            throw new Error('Failed to analyze review');
        }

        return response.json();
    },

    async getAspectDistribution(): Promise<AspectDistribution[]> {
        const response = await fetch(`${API_BASE_URL}/insights/aspect-distribution`);

        if (!response.ok) {
            throw new Error('Failed to fetch aspect distribution');
        }

        return response.json();
    },

    async getRatingMismatch(): Promise<RatingMismatch> {
        const response = await fetch(`${API_BASE_URL}/insights/rating-mismatch`);

        if (!response.ok) {
            throw new Error('Failed to fetch rating mismatch');
        }

        return response.json();
    },

    async getRootCauses(): Promise<RootCauses> {
        const response = await fetch(`${API_BASE_URL}/insights/root-causes`);

        if (!response.ok) {
            throw new Error('Failed to fetch root causes');
        }

        return response.json();
    },
};

export const exampleReviews = [
    "The camera quality is amazing and takes stunning photos. However, the battery life is disappointing and drains too quickly. The price is reasonable for what you get.",
    "Great phone overall with excellent performance and fast speed. The display is beautiful and crisp. But the battery dies in just a few hours of use.",
    "Love the build quality and premium design. The screen resolution is fantastic. Camera takes great pictures. Only complaint is the price is a bit high.",
    "Performance is terrible, very slow and laggy. Battery life is also poor. The only good thing is the camera which works well."
];
