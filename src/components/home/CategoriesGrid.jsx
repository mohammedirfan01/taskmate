import { useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import CategoryCard from "../shared/CategoryCard";

const CategoriesGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/services?category=${categoryTitle}`);
  };

  return (
    <section id="categories" className="py-20">
      <div className="max-w-6xl mx-auto px-4 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 ">
          Our Service Categories
        </h2>
        <p className="text-slate-600 mb-8">
          Explore a wide range of services curated for your home and office.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              {...cat}
              onClick={() => handleCategoryClick(cat.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
