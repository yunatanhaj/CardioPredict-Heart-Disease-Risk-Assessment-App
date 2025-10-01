const API_URL = 'http://127.0.0.1:5000/predict'; 

export const predictionApi = async (apiData) => {
    // Retry mechanism for transient network issues
    const maxRetries = 3;
    let lastError = null;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    // Important for JSON communication with Flask
                    'Content-Type': 'application/json',
                },
                // Send the data as a JSON string
                body: JSON.stringify(apiData),
            });

            // Handle non-200 responses (e.g., 400 Bad Request, 500 Internal Error from Flask)
            if (!response.ok) {
                const errorBody = await response.json();
                const errorMessage = errorBody.message || errorBody.error || `Server returned status ${response.status}`;
                throw new Error(errorMessage);
            }

            // Successful response (status 200)
            const result = await response.json();
            
            // Basic validation of the API response structure
            if (typeof result.prediction !== 'number' || typeof result.probability !== 'number') {
                 throw new Error("Invalid response format from server. Missing 'prediction' or 'probability'.");
            }

            return result; // Success: return the result
        } catch (error) {
            // Log the error and prepare to retry
            lastError = error instanceof Error ? error : new Error("An unknown network error occurred.");
            console.error(`Attempt ${i + 1} failed:`, lastError.message);
            
            if (i < maxRetries - 1) {
                // Exponential backoff: 1s, 2s, 4s...
                const delay = Math.pow(2, i) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    // If all retries fail, throw the last captured error
    throw lastError || new Error("Failed to connect to the prediction server after multiple retries.");
};