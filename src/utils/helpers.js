/**
 * Format angka ke format harga IDR
 * @param {number} price
 * @returns {string}
 */
export const fmtPrice = (price) =>
  `Rp ${price.toLocaleString("id-ID")}`;

/**
 * Mapping badge nama → CSS class
 * @param {string|null} badge
 * @returns {string}
 */
export const getBadgeClass = (badge) => {
  const map = {
    "Best Seller": "badge-bestseller",
    "New":        "badge-new",
    "Sale":       "badge-sale",
    "Hot":        "badge-hot",
    "Top Rated":  "badge-toprated",
  };
  return map[badge] || "";
};

/**
 * Generate order ID singkat dari timestamp
 * @returns {string}
 */
export const generateOrderId = () =>
  `NM-${Date.now().toString().slice(-8)}`;
