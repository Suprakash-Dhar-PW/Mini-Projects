import { useEffect, useState } from "react";

export const NewsList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=${import.meta.env.VITE_API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles));
  }, []);
  return (
    <>
      <h2 className="text-center my-4">
        Latest <span className="badge bg-danger">News</span>
      </h2>
    </>
  );
};
