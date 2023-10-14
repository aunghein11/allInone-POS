import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useState, useContext } from "react";
import { getAccessToken, getSelectedLocationId } from "../utils/generals";
import { AppContext } from "./AppContext";
import { config } from "../config/config";

const Tables = () => {
  const { tables } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState("");
  const selectedLocationId = getSelectedLocationId();
  const accessToken = getAccessToken();

  const validTables = tables.filter(
    (item) => item.locations_id === Number(selectedLocationId)
  );
  console.log("validTable", validTables);

  const createTale = async () => {
    if (!newTable) return alert("Table Name is require");
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTable, locationId: selectedLocationId }),
    });
    console.log(newTable);
    setOpen(false);
  };

  return (
    <Layout title="Tables">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          px: 3,
          pt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create New Table
          </Button>
        </Box>
        <Box sx={{}}>
          <h1>hello</h1>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Table Name</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <TextField
            onChange={(evt) => setNewTable(evt.target.value)}
            placeholder="Table Name"
            sx={{ width: "100%" }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={createTale}>
              Create Table
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Tables;
