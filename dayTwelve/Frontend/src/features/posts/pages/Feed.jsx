import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      <div className=" flex flex-col gap-4">
        {feed.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
