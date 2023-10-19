import { Link } from "react-router-dom";
import Layout from "./Layout";
import { useContext } from "react";
import { getMenuCategoriesByLocationId, getSelectedLocationId } from "../utils";
import { Box, Typography } from "@mui/material";
import { AppContext } from "./AppContext";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const validMenuCategories = getMenuCategoriesByLocationId(
    menuCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ pl: 3, pt: 3, display: "flex" }}>
        {validMenuCategories.map((item) => {
          return (
            <Link to={`${item.id}`} key={item.id}>
              <Box
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
            </Link>
          );
        })}
      </Box>
    </Layout>
  );
};

export default MenuCategories;
