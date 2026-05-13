/**
 * Formats a population count for display (locale-aware grouping).
 */
export function formatPopulation(population: number): string {
  return new Intl.NumberFormat().format(population);
}
