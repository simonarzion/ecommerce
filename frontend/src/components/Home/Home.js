import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://firstecommerce.herokuapp.com/posts");
      const data = res.data;
    };

    fetchPosts();
  }, []);
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
