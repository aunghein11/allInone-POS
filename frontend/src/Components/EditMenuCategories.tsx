import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getAccessToken, getLocationsByMenuCategoryIds } from "../utils";
import Autocomplete from "./Autocomplete";
import { config } from "../config/config";

const EditMenuCategory = () => {
  const params = useParams();
  const menuCategoryId = params.id as string;
  const { menuCategories, locations, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
  });

  const accessToken = getAccessToken();
  const validLocations = getLocationsByMenuCategoryIds(
    menusMenuCategoriesLocations,
    menuCategoryId,
    locations
  );

  const mappedValidLocations = validLocations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  if (!menuCategoryId) return null;

  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );

  const updateMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
  };

  if (!menuCategory)
    return (
      <Layout title="Edit menu category">
        <Box sx={{ pt: 3, pl: 3 }}>
          <Typography variant="h4">Menu category not found</Typography>
        </Box>
      </Layout>
    );

  return (
    <Layout title="Edit menu category">
      <Box
        sx={{
          pt: 3,
          pl: 3,
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          defaultValue={menuCategory.name}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
        <Box sx={{ width: "100%" }}>
          <Autocomplete
            options={mappedLocations}
            defaultValue={mappedValidLocations}
            label="Locations"
            placeholder="Locations"
            onChange={(options) =>
              setNewMenuCategory({
                ...newMenuCategory,
                locationIds: options.map((item) => Number(item.id)),
              })
            }
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={updateMenuCategory}
        sx={{ mt: 3, ml: 3 }}
      >
        Update
      </Button>
    </Layout>
  );
};

export default EditMenuCategory;
