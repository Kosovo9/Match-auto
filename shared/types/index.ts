export type VehicleCategory = 'car' | 'motorcycle' | 'boat' | 'plane' | 'truck' | 'rv';
export type ListingStatus = 'active' | 'sold' | 'pending' | 'flagged';
export type VehicleCondition = 'new' | 'used' | 'certified';

export interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    role: 'user' | 'affiliate' | 'admin' | 'vp';
    trustScore: number;
    createdAt: string;
}

export interface Listing {
    id: string;
    sellerId: string;
    title: string;
    description: string;
    category: VehicleCategory;
    price: number;
    currency: string;
    condition: VehicleCondition;
    make: string;
    model: string;
    year: number;
    mileage: number;
    location: {
        city: string;
        state: string;
        countryCode: string;
        coordinates?: [number, number];
    };
    media: {
        images: string[];
        videos?: string[];
    };
    status: ListingStatus;
    isFeatured: boolean;
    isVP: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SearchFilters {
    category?: VehicleCategory;
    make?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    yearFrom?: number;
    yearTo?: number;
    condition?: VehicleCondition;
    location?: string;
}
