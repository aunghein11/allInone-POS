interface BaseType {
  id?: number;
  name: string;
}

export interface Menu extends BaseType {
  price: number;
  locationIds: number[];
  description?: string;
  assetUrl?: string;
  isAvailable?: boolean;
}

export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  price: number;
  addon_categories_id: number;
}

export interface AddonCategory extends BaseType {
  isRequired: boolean;
}

export interface Location extends BaseType {
  companies_id: string;
  address?: string;
}

export interface MenusMenuCategoryLocation {
  id: number;
  menus_id: number;
  menu_categories_id: number;
  locations_id: number;
  is_available: boolean;
  is_archived: boolean;
}

export interface Company {
  id?: string;
  name: string;
  address: string;
}

export interface Table extends BaseType {
  locations_id: number;
}

export interface MenuAddonCategory {
  id: number;
  menus_id: number;
  addon_categories_id: number;
}
