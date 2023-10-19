import { createContext, useEffect, useState } from "react";
import {
  Menu,
  MenuCategory,
  Addon,
  AddonCategory,
  MenusMenuCategoryLocation,
  Company,
  Location,
  Table,
  MenuAddonCategory,
} from "./typings/Type";
import { config } from "../config/config";
import { useNavigate } from "react-router-dom";
import { getSelectedLocationId } from "../utils";
import Locations from "./Locations";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menusAddonCategories: MenuAddonCategory[];
  locations: Location[];
  tables: Table[];
  menusMenuCategoriesLocations: MenusMenuCategoryLocation[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: (accessToken: string) => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusAddonCategories: [],
  locations: [],
  tables: [],
  menusMenuCategoriesLocations: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken: ", accessToken);

  useEffect(() => {
    if (accessToken) {
      fetchData(accessToken);
    }
  }, [accessToken]);

  const fetchData = async (accessToken: string) => {
    if (!accessToken) {
      return;
    }
    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();

    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusAddonCategories,
      locations,
      tables,
      menusMenuCategoriesLocations,
      company,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      menusAddonCategories,
      locations,
      tables,
      menusMenuCategoriesLocations,
      company,
    });
    const selectedLocationId = getSelectedLocationId();
    if (!selectedLocationId) {
      localStorage.setItem("selectedLocationId", locations[0].id);
    }
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
function clockUpdate(): import("react").SetStateAction<string> {
  throw new Error("Function not implemented.");
}
