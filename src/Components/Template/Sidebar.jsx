import styles from "./Sidebar.module.css";

function Sidebar({ categories, selectedCategory, setSelectedCategory }) {
  const categoryHandler = (slug) => {
    setSelectedCategory((prev) => (prev === slug ? "" : slug));
  };
  return (
    <div className={styles.sidebar}>
      <h4>دسته بندی ها</h4>
      <ul>
        {categories.data.map((category) => (
          <li
            key={category._id}
            onClick={() => {
              console.log("CATEGORY:", category);
              categoryHandler(category.slug);
            }}
            className={selectedCategory === category.slug ? styles.active : ""}
          >
            <img src={`${category.icon}.svg`} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
