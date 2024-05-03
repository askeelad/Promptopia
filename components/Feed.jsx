"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  console.log(data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSeacrhedPosts] = useState([]);

  const handleSearChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    if (e.target.value == "") return fetchPosts();
    const filteredPosts = posts.filter((p) => {
      if (p.prompt.includes(e.target.value)) return true;
      if (p.tag.includes(e.target.value)) return true;
      if (p.creator.username.includes(e.target.value)) return true;
      return false;
    });
    setSeacrhedPosts(filteredPosts);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setSearchText(tag);
    const filteredPosts = posts.filter((p) => {
      if (p.prompt.includes(tag)) return true;
      if (p.tag.includes(tag)) return true;
      if (p.creator.username.includes(tag)) return true;
      return false;
    });
    setSeacrhedPosts(filteredPosts);
  };

  const fetchPosts = async () => {
    console.log("enter fetch");
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
    setSeacrhedPosts(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
