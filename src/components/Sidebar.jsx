import React, { useEffect } from "react";
import { Stack, colors } from "@mui/material";
import { categories } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSelected,
  getSelectCategory,
} from "../features/videos/videoSlice";

const Sidebar = () => {
  const selectedCategory = useSelector(getSelectCategory);
  const dispatch = useDispatch();
  const clickHandler = (categoryName) => {
    dispatch(updateSelected(categoryName));
  };
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          style={{
            backgroundColor: category.name === selectedCategory && "#FC1503",
            color: "white",
          }}
          key={category.name}
          onClick={() => clickHandler(category.name)}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
