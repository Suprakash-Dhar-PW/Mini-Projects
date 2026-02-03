const CategoryTabs = ({ setCategory }) => {
  const categories = [
    "general",
    "world",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];

  return (
    <div className="d-flex justify-content-center flex-wrap my-3 gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className="btn btn-outline-primary text-capitalize"
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
