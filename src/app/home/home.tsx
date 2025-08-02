import { ParkashHome } from "@/page-ui";

const Home = () => {
  return (
    <div>
      {/* {localStorage.getItem("ROLE") === roles.PARKASH && <ParkashHome />}
      {localStorage.getItem("ROLE") === roles.PARKASH_TABLET && <p>tablet</p>} */}
      <ParkashHome />
    </div>
  );
};

export default Home;
