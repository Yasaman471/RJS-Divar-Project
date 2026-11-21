import Sidebar from "@/Components/Template/Sidebar";
import Main from "@/Components/Template/Main";
import { useQuery } from "@tanstack/react-query";
import { getAllpost } from "@/Services/user";
import { getCategory } from "@/Services/admin";

import styles from "./HomePage.module.css";
import Loader from "@/Components/module/Loader";

function HomePage() {
  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["post-list"],
    queryFn: getAllpost,
  });
  const { data: categories, isLoading: categorieLoading } = useQuery({
    queryKey: ["get-category"],
    queryFn: getCategory,
  });

  return (
    <>
      {postLoading || categorieLoading ? (
        <Loader />
      ) : (
        <div className={styles.home}>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
