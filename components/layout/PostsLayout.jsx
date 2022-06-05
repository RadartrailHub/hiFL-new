import React from "react";
import PostsItem from "../posts/PostsItem";
import FixturesBrief from "../shared/FixturesBrief";
import PageTitle from "../shared/PageTitle";
import SideBar from "../shared/SideBar";

const PostsLayout = ({ name, posts }) => {
  return (
    <div className="font-redhat">
      <PageTitle name={name || "add a title"} />
      <div className="bg-white">
        <div className="max-w-[94%] md:max-w-[90%] mx-auto py-10 text-black">
          <div className="flex gap-7 xl:gap-20 justify-between">
            <div className="w-full lg:w-8/12 xl:w-9/12">
              <div className="flex flex-col gap-8">
                {posts?.map((post, i) => (
                  <PostsItem post={post} key={i} />
                ))}
              </div>
            </div>
            <div className="hidden lg:block w-4/12 xl:w-3/12 space-y-8">
              <div>
                <FixturesBrief />
              </div>
              <div>
                <SideBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsLayout;