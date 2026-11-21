import styles from "./Sidebar.module.css";

function Sidebar({ categories }) {
  return (
    <div className={styles.sidebar}>
      <h4>دسته بندی ها</h4>
      <ul>
        {categories.data.map((ctegory) => (
          <li key={ctegory._id}>
            <img src={`${ctegory.icon}.svg`} />
            <p>{ctegory.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
