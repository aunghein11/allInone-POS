import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import bcrypt from "bcrypt";
import { db } from "../db/db";
import { config } from "../config/Config";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", checkAuth, async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const companiesResult = await db.query(
      "insert into companies(name) values($1)  RETURNING *",
      ["Defult company"]
    );
    console.log(companiesResult.rows);
    const companiesId = companiesResult.rows[0].id;

    const text =
      "INSERT INTO users(name, email, password,companies_id) VALUES($1, $2, $3,$4) RETURNING *";
    const values = [name, email, hashedPassword, companiesId];
    const userResult = await db.query(text, values);
    const user = userResult.rows[0];
    delete user.password;

    const locationResult = await db.query(
      "insert into locations(name,address,companies_id) values($1,$2,$3)  RETURNING *",
      ["Defult location", "Defult address", companiesId]
    );

    const locationId = locationResult.rows[0].id;

    const menusResult = await db.query(
      "insert into menus(name,price) select * from unnest($1::text[],$2::int[]) returning *",
      [
        ["mote-hinn-kharr", "shan-khout-swell"],
        [500, 1000],
      ]
    );

    const menus = menusResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;
    await db.query(
      "insert into menus_locations(menus_id,locations_id) select * from unnest($1::int[],$2::int[]) returning *",
      [
        [defaultMenuId1, defaultMenuId2],
        [locationId, locationId],
      ]
    );

    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
    );
    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;

    await db.query(
      `insert into menus_menu_categories (menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
    );

    const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories (name,is_required) values ('Drinks',true), ('Sizes',true) returning *"
    );

    const addonCotegoriesIds = defaultAddonCategoriesResult.rows;
    const defaultAddonCategoryId1 = addonCotegoriesIds[0].id;
    const defaultAddonCategoryId2 = addonCotegoriesIds[1].id;

    await db.query(
      `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
    );

    await db.query(`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}), 
        ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);

    res.send(user);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

authRouter.post("/login", checkAuth, async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("reqBody", req.body);
  if (!email || !password) return res.sendStatus(400);
  const userResult = await db.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  console.log("userResult", userResult.rows[0]);

  if (!userResult.rows.length) return res.sendStatus(401);
  const user = userResult.rows[0];
  const hashedPassword = user.password;
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  if (isCorrectPassword) {
    const accessToken = jwt.sign(user, config.jwtSecret);
    return res.send({ accessToken });
  }
  return res.sendStatus(401);
});

export default authRouter;
