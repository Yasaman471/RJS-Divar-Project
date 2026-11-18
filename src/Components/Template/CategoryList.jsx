import { deleteCategory, getCategory } from "@/Services/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "./module/Loader";
import toast from "react-hot-toast";
import styles from "./CategoryList.module.css";

function CategoryList() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get-category"],
    queryFn: getCategory,
  });

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("دسته‌بندی با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
    },
    onError: () => {
      toast.error("خطایی در حذف دسته‌بندی رخ داد");
    },
  });

  const deleteHandler = (id) => {
    if (confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟")) {
      mutate(id);
    }
  };

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((item) => (
          <div key={item._id} className={styles.listItem}>
            <div className={styles.info}>
              <img src={`${item.icon}.svg`} />
              <h5>{item.name}</h5>
              <p>slug: {item.slug}</p>
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteHandler(item._id)}
            >
              حذف
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
