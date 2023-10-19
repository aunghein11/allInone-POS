import {
  Addon,
  AddonCategory,
  Location,
  Menu,
  MenuAddonCategory,
  MenuCategory,
  MenusMenuCategoryLocation,
} from "../components/typings/Type";

export const getSelectedLocationId = () => {
  return localStorage.getItem("selectedLocationId");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getMenuCategoriesByLocationId = (
  menuCategories: MenuCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoryLocation[]
) => {
  const selectedLocationId = getSelectedLocationId() as string;
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
};

export const getMenusByLocationId = (
  menusMenuCategoriesLocations: MenusMenuCategoryLocation[],
  menus: Menu[]
) => {
  const selectedLocationId = getSelectedLocationId() as string;
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};

const getAddonCategoryIds = (
  addonCategories: AddonCategory[],
  menusAddonCategories: MenuAddonCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoryLocation[]
) => {
  const selectedLocationId = getSelectedLocationId() as string;
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.locations_id && item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);
  return menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id);
};

export const getAddonCategoryByLocationIds = (
  addonCategories: AddonCategory[],
  menusAddonCategories: MenuAddonCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoryLocation[]
) => {
  const validAddonCategoryIds = getAddonCategoryIds(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id as number)
  );
};

export const getAddonByLocationIds = (
  addons: Addon[],
  addonCategories: AddonCategory[],
  menusAddonCategories: MenuAddonCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoryLocation[]
) => {
  const validAddonCategoryIds = getAddonCategoryIds(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );
  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_categories_id as number)
  );
};

export const getLocationsByMenuCategoryIds = (
  menusMenuCategoriesLocations: MenusMenuCategoryLocation[],
  menuCategoryId: String,
  locations: Location[]
) => {
  const vailLocationIds = menusMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.locations_id);
  return locations.filter((item) =>
    vailLocationIds.includes(item.id as number)
  );
};
