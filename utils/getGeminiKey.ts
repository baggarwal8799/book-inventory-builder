const useLocalStorage = process.env.NEXT_PUBLIC_USE_LOCALSTORAGE_FOR_APIKEY === 'true';

export const getGeminiKey = (): string | null => {
  if (useLocalStorage && typeof window !== 'undefined') {
    return localStorage.getItem('geminiApiKey');
  }
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY || null;
};

export const setGeminiKey = (key: string) => {
  if (useLocalStorage && typeof window !== 'undefined') {
    localStorage.setItem('geminiApiKey', key);
  }
};

export const clearGeminiKey = () => {
  if (useLocalStorage && typeof window !== 'undefined') {
    localStorage.removeItem('geminiApiKey');
  }
};

export const isUsingLocalStorage = () => useLocalStorage;
