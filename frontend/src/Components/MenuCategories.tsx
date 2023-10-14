import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useEffect } from "react";

import { getSelectedLocationId } from "../utils/generals";
import { Box, Typography } from "@mui/material";
import { AppContext } from "./AppContext";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const selectedLocationId = getSelectedLocationId() as string;
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  const validMenuCategories = menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ pl: 3, pt: 3, display: "flex" }}>
        {validMenuCategories.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                height: 150,
                width: 100,
                border: "2px solid lightgray",
                mr: 2,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};

export default MenuCategories;
