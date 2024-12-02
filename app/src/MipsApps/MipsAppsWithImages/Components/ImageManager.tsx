import React, { useEffect } from "react";

export const ImageManager = ({ image }) => {
  useEffect(() => {
    console.log(image);
  }, [image]);
  return <img src={"/" + image} alt="" />;
};
