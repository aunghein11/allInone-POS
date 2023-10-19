import { useContext, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "./AppContext";
import Box from "@mui/material/Box";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { config } from "../config/config";

const Locations = () => {
  const { locations, company, fetchData } = useContext(AppContext);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });

  const accessToken = localStorage.getItem("accessToken");

  const updateLocation = () => {
    console.log("newLocation", newLocation);
  };

  const createLocation = async (accessToken: string) => {
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    setNewLocation({ name: "", address: "", companyId: company?.id });
    fetchData(accessToken);
  };

  return (
    <Layout title="Locations">
      <Box sx={{ ml: 5, mt: 3 }}>
        {locations.map((location, index) => {
          return (
            <Box
              key={location.id}
              sx={{ mt: 3, display: "flex", alignItems: "center" }}
            >
              <Typography variant="h5">{`${index + 1} . `}</Typography>
              <TextField defaultValue={location.name} sx={{ mr: 2 }} />
              <TextField defaultValue={location.address} sx={{ mr: 2 }} />
              <Button variant="contained" onClick={updateLocation}>
                Update
              </Button>
            </Box>
          );
        })}
      </Box>
      <Divider sx={{ mt: 3 }} />
      <Box sx={{ ml: 8.5, mt: 3, display: "flex", alignItems: "center" }}>
        <TextField
          value={newLocation.name}
          sx={{ mr: 2 }}
          onChange={(event) => {
            setNewLocation({ ...newLocation, name: event.target.value });
          }}
        />
        <TextField
          value={newLocation.address}
          sx={{ mr: 2 }}
          onChange={(event) => {
            setNewLocation({ ...newLocation, address: event.target.value });
          }}
        />
        <Button
          variant="contained"
          onClick={() => createLocation(accessToken as string)}
        >
          Create
        </Button>
      </Box>
    </Layout>
  );
};

export default Locations;
