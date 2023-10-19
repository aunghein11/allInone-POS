import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useEffect } from "react";
import { getAddonCategoryByLocationIds, getSelectedLocationId } from "../utils";
import { Box, Typography } from "@mui/material";
import { AppContext } from "./AppContext";

const AddonCategories = () => {
  const {
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(AppContext);
  const validAddonCategories = getAddonCategoryByLocationIds(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Layout title="Addon Categories">
      <Box sx={{ pl: 3, pt: 3, display: "flex" }}>
        {validAddonCategories.map((item) => {
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

export default AddonCategories;
