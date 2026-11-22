import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/Components/Template/Sidebar";
import Loader from "@/Components/module/Loader";
import Main from "@/Components/Template/Main";
import { getAllpost } from "@/Services/user";
import { getCategory } from "@/Services/admin";

import styles from "./HomePage.module.css";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["post-list", selectedCategory],
    queryFn: () =>
      getAllpost({
        category: selectedCategory === "all-post" ? "" : selectedCategory,
      }),
  });
  const { data: categories, isLoading: categorieLoading } = useQuery({
    queryKey: ["get-category"],
    queryFn: getCategory,
  });

  console.log(
    "SELECTED:",
    selectedCategory,
    "COUNT:",
    posts?.data?.posts?.length,
  );

  return (
    <>
      {postLoading || categorieLoading ? (
        <Loader />
      ) : (
        <div className={styles.home}>
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
