import Box from "@mui/material/Box";
import Layout from "./Layout";
import { Button, Chip, Stack, TextField } from "@mui/material";
import { useState } from "react";
import FileDropZone from "./FileDropZone";
import { config } from "../config/config";

const CreateMenus = () => {
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
  });

  const accessToken = localStorage.getItem("accessToken");

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onFileSelected = (selectedFiles: File[]) => {
    setSelectedFiles(selectedFiles);
  };

  const createNewMenu = async () => {
    const isValid = newMenu.name && newMenu.description;
    if (!isValid) return console.log("Name and description required.");
    if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);

      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();

      newMenu.assetUrl = responseData.assetUrl;
    }
    console.log("newMenu", newMenu);

    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          margin: "0 auto",
          mt: 3,
          maxWidth: 350,
        }}
      >
        <TextField
          placeholder="Name"
          sx={{ mb: 2, borderRadius: 10 }}
          onChange={(event) => {
            setNewMenu({ ...newMenu, name: event.target.value });
          }}
        />
        <TextField
          placeholder="Description"
          sx={{ mb: 2 }}
          onChange={(event) => {
            setNewMenu({ ...newMenu, description: event.target.value });
          }}
        />
        <TextField
          placeholder="Price"
          sx={{ mb: 2 }}
          onChange={(event) => {
            setNewMenu({ ...newMenu, price: Number(event.target.value) });
          }}
        />
        <Box sx={{ mb: 5 }}>
          <FileDropZone onFileSelected={onFileSelected} />
          <Box sx={{ mt: 2 }}>
            {selectedFiles.map((file) => {
              return (
                <Chip
                  key={file.name}
                  label={file.name}
                  onDelete={() => {
                    const filterSelectedFile = selectedFiles.filter(
                      (selectedFile) => selectedFile.name !== file.name
                    );
                    setSelectedFiles(filterSelectedFile);
                  }}
                  sx={{ mr: 2, mb: 2 }}
                />
              );
            })}
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={createNewMenu}
          sx={{ mb: 3, maxWidth: 150, margin: "0 auto" }}
        >
          Create Menu
        </Button>
      </Box>
    </Layout>
  );
};

export default CreateMenus;
