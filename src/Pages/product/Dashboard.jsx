import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/features/productdeleteSlice";
import DataTable from "../../Components/product/DataTable";
import ProductDetail from "./ProductDetail";
import CreateProdcut from "./CreateProdcut";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProduct from "./EditProduct";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import Swal from "sweetalert2";

import "./../../Styles/dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const deletes = useSelector((state) => state.deleteproduct);
  const [DeleteData, setDeleteData] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  // console.log(process.env.REACT_APP_API_BASE_URL);

  const handleDataFromTable = (data) => {
    setDeleteData(data);
    data.length === 0 ? setIsDisabled(true) : setIsDisabled(false);
  };
  // console.log(DeleteData);
  function deleteHandleClick() {
    const data = {
      productIds: DeleteData,
    };
    dispatch(deleteProduct(data));
    if (deletes.isError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: deletes.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: deletes.message,
      });
    }
    setIsDisabled(true);
  }

  return (
    <div>
      <div className="dashboardContent">
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Grid className="barContainer">
            <Link to="/addstock">
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => {
                  setDeleteData([]);
                }}
              >
                <PersonAddAlt1OutlinedIcon />
                <span className="btnText">Add New Stock</span>
              </Button>
            </Link>
            <Button
              size="large"
              color="primary"
              variant="contained"
              sx={{ marginLeft: "10px" }}
              disabled={isDisabled}
              onClick={() =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteHandleClick();
                  }
                })
              }
              // onClick={deleteHandleClick}
            >
              <DeleteIcon />
              <span className="btnText">Remove Stock</span>
            </Button>
          </Grid>
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Grid className="barContainer">
            <Link to="/addstock">
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => {
                  setDeleteData([]);
                }}
              >
                <PersonAddAlt1OutlinedIcon />
                <span className="btnText">Add</span>
              </Button>
            </Link>
            <Button
              size="large"
              color="primary"
              variant="contained"
              sx={{ marginLeft: "10px" }}
              disabled={isDisabled}
              onClick={() =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteHandleClick();
                  }
                })
              }
            >
              <PersonAddAlt1OutlinedIcon />
              <span className="btnText">Remove</span>
            </Button>
          </Grid>
        </Box>
        {/* Stock CRUD Route */}
        <Box>
          <Routes>
            <Route path="/addstock" element={<CreateProdcut />} />
            <Route
              path="/"
              element={<DataTable sendDataToDashboard={handleDataFromTable} />}
            />
            <Route path="/editstock/:id" element={<EditProduct />} />
            <Route path="/viewstock/:id" element={<ProductDetail />} />
          </Routes>
        </Box>
      </div>
    </div>
  );
}
