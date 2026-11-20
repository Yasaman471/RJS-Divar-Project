import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { getCategory } from "@/Services/admin";
import { getcookie } from "@/utils/cookie";
import styles from "./AddPost.module.css";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    city: "",
    category: "",
    amount: "",
    images: null,
  });

  const { data } = useQuery({
    queryKey: ["get-category"],
    queryFn: getCategory,
  });

  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const token = getcookie("accessToken");
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) =>
      axios.post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "آگهی با موفقیت ثبت شد");
      setForm({
        title: "",
        content: "",
        city: "",
        category: "",
        amount: "",
        images: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      queryClient.invalidateQueries({
        queryKey: ["my-post-list"],
      });
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "ثبت آگهی انجام نشد"),
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    if (name !== "images") {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: event.target.files[0] }));
    }
  };

  const addHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    mutate(formData);
  };

  return (
    <form className={styles.form} onSubmit={addHandler}>
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input
        type="text"
        name="title"
        id="title"
        value={form.title}
        onChange={changeHandler}
      />
      <label htmlFor="content">توضیحات</label>
      <textarea
        name="content"
        id="content"
        value={form.content}
        onChange={changeHandler}
      />
      <label htmlFor="amount">قیمت</label>
      <input
        type="number"
        name="amount"
        value={form.amount}
        id="amount"
        onChange={changeHandler}
      />
      <label htmlFor="city">شهر</label>
      <input
        type="text"
        name="city"
        value={form.city}
        id="city"
        onChange={changeHandler}
      />
      <label htmlFor="category">دسته بندی</label>
      <select
        name="category"
        id="category"
        value={form.category}
        onChange={changeHandler}
      >
        {data?.data.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      <input
        type="file"
        name="images"
        id="images"
        onChange={changeHandler}
        ref={fileInputRef}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "در حال ارسال..." : "ایجاد"}
      </button>
    </form>
  );
}

export default AddPost;
