const CategoryCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center md:text-left md:items-start"
      onClick={onClick}
    >
      <div className="mb-4 text-sky-600 text-2xl">{icon}</div>
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
};

export default CategoryCard;
