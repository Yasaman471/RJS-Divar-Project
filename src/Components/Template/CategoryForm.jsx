import { useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "@/Services/admin";
import toast from "react-hot-toast";

function CategoryForm() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      toast.success("دسته‌بندی با موفقیت ثبت شد");
      setForm({ name: "", slug: "", icon: "" });
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
    },
    onError: (error) => {
      const status = error?.response?.status;

      if (status === 409) {
        toast.error("این دسته‌بندی از قبل وجود دارد");
      } else {
        toast.error("خطایی در ثبت دسته‌بندی رخ داد");
      }
    },
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) {
      toast.error("همه‌ی فیلدها را پر کن");
      return;
    }
    mutate(form);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h3>دسته بندی جدید</h3>
      <label htmlFor="name">اسم دسته بندی</label>
      <input
        type="text"
        name="name"
        id="name"
        value={form.name}
        onChange={changeHandler}
      />
      <label htmlFor="slug">اسلاگ</label>
      <input
        type="text"
        name="slug"
        id="slug"
        value={form.slug}
        onChange={changeHandler}
      />
      <label htmlFor="icon">آیکون</label>
      <input
        type="text"
        name="icon"
        id="icon"
        value={form.icon}
        onChange={changeHandler}
      />
      <button type="submit" disabled={isPending}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
