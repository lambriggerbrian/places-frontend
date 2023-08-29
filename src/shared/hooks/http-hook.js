import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (abortController) => abortController !== httpAbortController
        );
        const responseData = await response.json();
        setIsLoading(false);
        if (!response.ok) {
          console.log(responseData);
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (error) {
        setHasError(error.message || "Something went wrong, please try again.");
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setHasError(null);
  };

  useEffect(() => {
    return () => {
      // This cleanup function expects activeHttpRequests to have changed
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, hasError, sendRequest, clearError };
};
