/**
 * Formats an area in square kilometres for display.
 */
export function formatArea(km2: number): string {
  return `${new Intl.NumberFormat().format(Math.round(km2))} km²`;
}
