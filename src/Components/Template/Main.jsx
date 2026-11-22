import styles from "./Main.module.css";

import { sp } from "@/utils/numbers";

function Main({ posts }) {
  return (
    <div className={styles.container}>
      {posts?.data?.posts.map((post) => (
        <div key={post._id} className={styles.card}>
          <div className={styles.info}>
            <p>{post.options.title}</p>
          </div>
          <div className={styles.info}>
            <p>{sp(post.amount)} تومان</p>
            <span>{post.options.city}</span>
          </div>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${post.images[0] || ""}`}
            alt={post.options?.title || "آگهی"}
          />
        </div>
      ))}
    </div>
  );
}

export default Main;
