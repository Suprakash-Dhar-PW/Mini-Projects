const BASE_URL = "https://gnews.io/api/v4/top-headlines";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchNews = async (category = "general", limit = 10) => {
  try {
    const url = `${BASE_URL}?category=${category}&lang=en&apikey=${API_KEY}&max=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
