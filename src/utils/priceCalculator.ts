import type { HouseFeatures } from '../types';

export function calculateHousePrice(features: HouseFeatures) {
  // Base ₹/sqft by location (realistic)
  const basePerSqftMap: Record<HouseFeatures['location'], number> = {
    downtown: 10000,
    suburban: 4500,
    urban: 6000,
    rural: 1500,
    waterfront: 15000,
    mountain: 3000,
  };

  const base = basePerSqftMap[features.location] ?? 4000;
  const sizeContrib = Math.max(0, features.squareFootage) * base;

  const lotContrib = Math.max(0, features.lotSize) * 400000; // 0.1 acre ~ 40k
  const bedsContrib = Math.max(0, features.bedrooms) * 200000;
  const bathsContrib = Math.max(0, features.bathrooms) * 90000;

  let extrasContrib = 0;
  if (features.hasGarage) extrasContrib += 100000;
  if (features.hasPool) extrasContrib += 300000;
  if (features.hasFireplace) extrasContrib += 50000;
  if (features.nearhospital) extrasContrib += 100000;
  if (features.hasGarden) extrasContrib += 70000;
  if (features.hasBalcony) extrasContrib += 50000;
  if (features.hasSolar) extrasContrib += 80000;
  if (features.hasSecurity) extrasContrib += 40000;

  // Floors & Parking realistic
  if (features.floors) extrasContrib += features.floors * 75000;
  if (features.parkingSpaces) extrasContrib += features.parkingSpaces * 50000;

  // Furnishing realistic
  if (features.furnishing === 'semi-furnished') extrasContrib += 50000;
  if (features.furnishing === 'fully-furnished') extrasContrib += 120000;

  // Distance from city center
  if (features.cityCenterDistance) extrasContrib -= features.cityCenterDistance * 3000;

  let price = sizeContrib + lotContrib + bedsContrib + bathsContrib + extrasContrib;

  // Property type factor
  const typeMul: Record<HouseFeatures['propertyType'], number> = {
    house: 1,
    condo: 0.9,
    townhouse: 0.95,
    apartment: 0.85,
  };
  price *= typeMul[features.propertyType] ?? 1;

  // Condition factor
  const conditionFactor: Record<HouseFeatures['condition'], number> = {
    excellent: 1.05,
    good: 1,
    fair: 0.96,
    poor: 0.9,
  };
  price *= conditionFactor[features.condition] ?? 1;

  // Age penalty: realistic depreciation
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - (features.yearBuilt ?? currentYear));
  price *= Math.max(0.85, 1 - age * 0.0035);

  price = Math.round(price);

  // Confidence
  let confidence = 0.55;
  if (features.condition === 'excellent') confidence += 0.15;
  else if (features.condition === 'good') confidence += 0.08;
  if (features.squareFootage >= 600 && features.squareFootage <= 3000) confidence += 0.08;
  if (['suburban', 'urban'].includes(features.location)) confidence += 0.05;
  confidence = Math.min(0.95, confidence);

  // Breakdown for visualization
  const contributions = {
    size: sizeContrib,
    lot: lotContrib,
    beds: bedsContrib,
    baths: bathsContrib,
    extras: extrasContrib,
  };
  const totalContrib = Object.values(contributions).reduce((s, v) => s + Math.max(0, v), 1);
  const breakdown: Record<string, number> = {};
  Object.entries(contributions).forEach(([k, v]) => (breakdown[k] = Math.max(0, v) / totalContrib));

  return { price, confidence, breakdown };
}
