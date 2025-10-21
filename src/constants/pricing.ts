/**
 * Shared pricing constants for Mālama Digital Care
 * Use these constants throughout the application to ensure consistency
 */

export const PLAN_PRICES = {
  BASIC: 39,
  STANDARD: 79,
  PREMIUM: 179,
} as const;

export const SESSION_PRICES = {
  IN_HOME: {
    regular: 85,
    discounted: 72.25, // 15% member discount
  },
  VIRTUAL: {
    regular: 35,
    discounted: 29.75, // 15% member discount
  },
  GROUP: {
    regular: 120,
    discounted: 102, // 15% member discount
  },
  INITIAL_ASSESSMENT: {
    regular: 85,
    discounted: 68, // 20% new customer discount
  },
} as const;

export const DISCOUNTS = {
  MEMBER: 0.15, // 15% member discount on add-on sessions
  NEW_CUSTOMER: 0.20, // 20% discount on first assessment
  PREMIUM_UPGRADE: 0.20, // 20% discount for first month when upgrading to Premium
} as const;

export const PLAN_DETAILS = {
  BASIC: {
    name: 'Basic Care',
    price: PLAN_PRICES.BASIC,
    priceDisplay: `$${PLAN_PRICES.BASIC}/month`,
    features: [
      '1 virtual session (30 min) per month',
      'Email support (48-hour response)',
      'Learning library access',
    ],
  },
  STANDARD: {
    name: 'Standard Care',
    price: PLAN_PRICES.STANDARD,
    priceDisplay: `$${PLAN_PRICES.STANDARD}/month`,
    features: [
      '1 in-home visit (90 min) OR 3 virtual sessions per month',
      'Email/phone support (same-day response)',
      'Learning library access & custom guides',
      `${DISCOUNTS.MEMBER * 100}% discount on add-on sessions`,
    ],
    inHomeAllowed: 1,
    virtualAllowed: 3,
  },
  PREMIUM: {
    name: 'Premium Care',
    price: PLAN_PRICES.PREMIUM,
    priceDisplay: `$${PLAN_PRICES.PREMIUM}/month`,
    features: [
      '2 in-home visits (90 min) OR 6 virtual sessions per month',
      'Priority 24/7 phone support',
      'Unlimited email support',
      'Custom learning plans',
      'Monthly progress reports',
      `${DISCOUNTS.MEMBER * 100}% discount on add-on sessions`,
    ],
    inHomeAllowed: 2,
    virtualAllowed: 6,
  },
} as const;

/**
 * Calculate discounted price
 */
export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercent: number
): number {
  return Math.round((originalPrice * (1 - discountPercent)) * 100) / 100;
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2).replace(/\.00$/, '')}`;
}
