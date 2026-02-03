import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="card h-100 shadow-sm">
      {article.image && (
        <img
          src={article.image}
          className="card-img-top"
          alt={article.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {article.source.name} -{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </h6>
        <p
          className="card-text text-truncate-3"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.description}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-auto"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
