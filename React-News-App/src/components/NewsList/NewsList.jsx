import NewsCard from "../NewsCard/NewsCard";

const NewsList = ({ articles }) => {
  return (
    <div className="container">
      <h2 className="text-center my-4">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
