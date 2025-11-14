export interface HouseFeatures {
 
  location: string;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces?: number;
  amenities?: string[];
  [key: string]: any;
}

export interface PredictionResult {
  id: string;
  features: HouseFeatures; // ✅ add this line
  predictedPrice: number;
  confidence: number;
  breakdown: Record<string, number>;
  createdAt: string;
}
