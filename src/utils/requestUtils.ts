export function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError'
}

export function handleResponseError(error: unknown) {
  if (!isAbortError(error)) {
    console.error(error)
  }
}
