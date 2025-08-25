import Add from "../../../components/posts/Add";
import PostsList from "../../../components/posts/PostsList";
import ProfileCard from "../../../components/profile/ProfileCard";
import {Helmet} from "react-helmet";


export default function Profile() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Kudo | Profile</title>
      </Helmet>

      <Add />
      <ProfileCard />
      <PostsList isHome={false} />
    </>
  );
}
