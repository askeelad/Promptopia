import PromptCard from "./PromptCard";
import { Skeleton } from "@nextui-org/react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <Skeleton isLoaded={name} className="rounded-lg">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{name} Profile</span>
        </h1>
      </Skeleton>
      <Skeleton isLoaded={name} className="rounded-lg my-8">
        <p className="desc text-left">{desc}</p>
      </Skeleton>
      <div className="mt-10 prompt_layout">
        {data.length == 0 &&
          [1, 1, 1, 1, 1].map((p) => (
            <Skeleton className="rounded-lg">
              <PromptCard
                key={"s21312"}
                post={{
                  prompt: "",
                  tag: "",
                  creator: { username: "", email: "", _id: "", image: "" },
                }}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleEdit && handleDelete(post)}
              />
            </Skeleton>
          ))}
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleEdit && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
