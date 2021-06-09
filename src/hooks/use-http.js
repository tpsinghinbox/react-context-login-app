import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = (requestConfigObj, applyData) => {
    setIsLoading(true);
    setError(null);
    fetch(requestConfigObj.url, {
      method: requestConfigObj.method ? requestConfigObj.method : "GET",
      body: requestConfigObj.body
        ? JSON.stringify(requestConfigObj.body)
        : null,
      headers: requestConfigObj.headers ? requestConfigObj.headers : null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (data && data.error) {
          let errorMessage;
          if (data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        } else {
          applyData(data);
        }
      })
      .catch((error) => {
        setError(error.message || "Authentication failed");
      });
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
