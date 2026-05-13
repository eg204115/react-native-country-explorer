/**
 * Normalizes thrown values from async boundaries into a user-facing string.
 */
export function mapUnknownToErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong.';
}
