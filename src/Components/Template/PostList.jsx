import { useQuery } from "@tanstack/react-query";
import { getPostData } from "@/Services/user";
import Loader from "./module/Loader";
import { sp } from "@/utils/numbers";
import styles from "./PostList.module.css";

function PostList() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPostData,
  });
  console.log("پاسخ دریافتی از سرور:", data);

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data?.data?.posts?.map((post) => (
            <div key={post._id} className={styles.post}>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${post.images[0] || ""}`}
                alt={post.options?.title || "آگهی"}
              />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)}تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
