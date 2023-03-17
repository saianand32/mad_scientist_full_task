import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { deleteByIdRoute } from "../../utils/APIRoutes";
import axios from "axios";
import { Button } from "@mui/material";

export default function PDFcard({
  filename,
  _id,
  setLoading,
  setAllPdfs,
  allPdfs,
}) {
  const theme = useTheme();

  const handleDelete = async () => {
    setLoading(true);
    const resp = await axios.delete(deleteByIdRoute + `/${_id}`);
    console.log(resp.data.msg);
    const arr = allPdfs.filter((e) => {
      return e._id !== _id;
    });
    setAllPdfs(arr);
    setLoading(false);
  };

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {filename}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            .PDF file
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button
            style={{
              color: "white",
              backgroundColor: "#9c43ff",
              marginTop: "3rem",
              fontWeight: "bold",
            }}
            onClick={handleDelete}
          >
            {" "}
            Delete{" "}
          </Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://x6k7p6q7.rocketcdn.me/wp-content/uploads/2020/01/What-Is-a-PDF-File-And-What-Are-PDFs-For.png"
        alt="PDF img"
      />
    </Card>
  );
}
