/**
 * ============================================================================
 * E-WASTE & ENVIRONMENTAL MANAGEMENT E-PORTFOLIO CONFIGURATION
 * ============================================================================
 * 
 * Update these three URL variables with your actual hosted project and game links.
 * 
 * - Leave as empty string "" or "ADD_..._HERE" while pending.
 * - Cards will remain fully styled and interactive, but will safely alert the user
 *   that the destination is pending configuration instead of causing broken navigation.
 * - When configured (e.g. "https://my-university-portfolio.edu"), clicking the card
 *   or its button will seamlessly open the destination in a new browser tab.
 */

export interface PortfolioLinksConfig {
  /** The destination URL for the college assignments, academic activities & reports e-portfolio */
  PORTFOLIO_URL: string;

  /** The destination URL for the interactive game "The Forgotten Drawer" */
  FORGOTTEN_DRAWER_URL: string;

  /** The destination URL for the environmental mystery game "E-Waste Detective" */
  EWASTE_DETECTIVE_URL: string;
}

export const PORTFOLIO_CONFIG: PortfolioLinksConfig = {
  // Destination URL for academic assignments, reports, activities & E-Waste learning journey
  PORTFOLIO_URL: "https://sites.google.com/view/nirmiti-e-portfolio/home",

  // Destination URL for "The Forgotten Drawer" interactive game
  FORGOTTEN_DRAWER_URL: "https://the-forgotten-drawer.vercel.app/",

  // Destination URL for "E-Waste Detective" environmental mystery game
  EWASTE_DETECTIVE_URL: "https://e-waste-detective.vercel.app/",
};

/**
 * Helper to determine whether a configured URL is valid for navigation.
 */
export function isUrlConfigured(url: string | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === "" || trimmed.startsWith("ADD_") || trimmed.includes("ADD_")) {
    return false;
  }
  // Accepts relative paths starting with / or http(s) protocols
  return trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/");
}
