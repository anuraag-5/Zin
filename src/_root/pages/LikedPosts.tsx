import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUserMutation } from "@/lib/react-query/queriesAndMutation";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUserMutation();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;