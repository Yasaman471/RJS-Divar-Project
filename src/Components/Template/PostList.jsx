import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getPostData } from "@/Services/user";

import { sp } from "@/utils/numbers";
import styles from "./PostList.module.css";
import toast from "react-hot-toast";
import Loader from "../module/Loader";

function PostList() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPostData,
  });
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "آگهی با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["my-post-list"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "خطایی در حذف آگهی رخ داد");
    },
  });

  const deleteHandler = (id) => {
    if (confirm("آیا از حذف این آگهی مطمئن هستید؟")) {
      mutate(id);
    }
  };
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
                <span>{post.options?.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)}تومان</span>
              </div>
              <button onClick={() => deleteHandler(post._id)}>حذف آگهی</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
