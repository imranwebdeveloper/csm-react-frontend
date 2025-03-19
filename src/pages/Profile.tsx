import ContentTable from "@/components/ContentTable";
import ProfileCard from "@/components/ProfileCard";

const Profile = () => {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <ProfileCard />
      <ContentTable />
    </div>
  );
};

export default Profile;
