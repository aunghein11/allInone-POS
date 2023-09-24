import { useContext } from "react";
import Layout from "./Layout";
import { AppContext } from "./AppContext";

const Locations = () => {
  const { locations } = useContext(AppContext);
  console.log("locations..", locations);
  return (
    <Layout title="Locations">
      <div>
        <h1>Locations page</h1>
      </div>
    </Layout>
  );
};

export default Locations;
