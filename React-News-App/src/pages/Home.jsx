import { useEffect, useState } from "react";
import { fetchNews } from "../services/newsApi";

import Header from "../components/Header/Header";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import NewsList from "../components/NewsList/NewsList";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const [limit, setLimit] = useState(5);

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchNews(category, limit);

        setArticles(data.articles);
        setTotalResults(data.totalArticles);
      }
      catch {
        setError(true);
      }
      finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [category, limit]);

  const renderFooter = () => {
    if (loading) {
      return null;
    }

    if (error) {
      return null;
    }

    if (articles.length === 0) {
      return null;
    }

    if (articles.length < totalResults && articles.length === limit) {
      return (
        <div className="text-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => setLimit((prev) => prev + 5)}
          >
            Load More
          </button>
        </div>
      );
    }
    else {
      return (
        <p className="text-center text-muted my-4">
          No more articles to load (GNews Free Plan limit reached)
        </p>
      );
    }
  };

  return (
    <div className={dark ? "bg-dark text-light min-vh-100" : ""}>
      <Header dark={dark} toggleDark={() => setDark(!dark)} />

      <CategoryTabs
        setCategory={(cat) => {
          setCategory(cat);
          setArticles([]);
          setLimit(5);
        }}
      />

      {error && <Error />}

      {articles.length > 0 && <NewsList articles={articles} />}

      {loading && <Loader />}

      {renderFooter()}
    </div>
  );
};

export default Home;
