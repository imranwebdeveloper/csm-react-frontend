import UserList from "@/components/UserList";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to ContentHub</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Browse content from our community or create your own profile
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Our Community Members</h2>
        <UserList />
      </div>
    </div>
  );
};

export default Home;
