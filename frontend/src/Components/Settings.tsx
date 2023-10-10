import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const Settings = () => {
  const { company, locations, fetchData } = useContext(AppContext);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    if (locations.length) {
      const locationIdFromStorage = localStorage.getItem("selectedLocationId");
      if (locationIdFromStorage) {
        setSelectedLocationId(locationIdFromStorage);
      } else {
        const firstLocationId = String(locations[0].id);
        setSelectedLocationId(firstLocationId);
        localStorage.setItem("selectedLocationId", firstLocationId);
      }
    }
  }, [locations]);

  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectedLocationId", event.target.value);
  };

  return (
    <Layout title="Settings">
      <Box sx={{ mt: 3, ml: 5, maxWidth: 300 }}>
        <TextField value={company?.name} />

        <Box sx={{ mt: 3, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Locations</InputLabel>
            <Select
              value={selectedLocationId}
              label="Locations"
              onChange={handleChange}
            >
              {locations.map((location) => {
                return (
                  <MenuItem value={location.id} key={location.id}>
                    {location.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Layout>
  );
};

export default Settings;
