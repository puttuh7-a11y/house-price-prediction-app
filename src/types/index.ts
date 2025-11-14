// src/types/index.ts

export interface HouseFeatures {
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize: number;
  yearBuilt: number;
  location: 'downtown' | 'suburban' | 'urban' | 'rural' | 'waterfront' | 'mountain';
  propertyType: 'house' | 'condo' | 'townhouse' | 'apartment';
  hasGarage: boolean;
  hasPool: boolean;
  hasFireplace: boolean;
  nearhospital: boolean;
  hasGarden: boolean;
  hasBalcony: boolean;
  hasSolar: boolean;
  hasSecurity: boolean;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface PredictionResult {
  id: string;
  features: HouseFeatures;
  predictedPrice: number;
  confidence: number; // 0..1
  breakdown: Record<string, number>; // contribution percentages (0..1)
  createdAt: string;
}
