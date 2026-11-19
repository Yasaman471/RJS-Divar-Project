import { getCategory } from "@/Services/admin";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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

  const changeHandler = (event) => {
    const { name, value } = event.target;
    if (name !== "images") {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: event.target.files[0] }));
    }
  };

  const addHandler = () => {
    event.preventDefault();
    console.log(form);
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
      <label htmlFor="title">توضیحات</label>
      <textarea
        name="content"
        id="content"
        value={form.content}
        onChange={changeHandler}
      />
      <label htmlFor="amount">قیمت</label>
      <input
        type="text"
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
      <input type="file" name="images" id="images" onChange={changeHandler} />
      <button type="submit">ایجاد</button>
    </form>
  );
}

export default AddPost;
