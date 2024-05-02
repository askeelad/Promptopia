"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const IndividualProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const { data: session } = useSession();

  const fetchPosts = async () => {
    console.log("enter fetch");
    const userResponse = await fetch(`/api/users/${params.id}`);
    const userData = await userResponse.json();
    console.log(userData);
    setUserInfo(userData);
    const response = await fetch(`/api/users/${params.id}/posts`);
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };

  useEffect(() => {
    console.log("useeeeee");
    console.log(session);
    if (session?.user.id) fetchPosts();
  }, [session]);

  return (
    <>
      <Profile
        name={userInfo.username}
        desc={`Welcome to ${userInfo.username} personalize profile page`}
        data={posts}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    </>
  );
};

export default IndividualProfile;
