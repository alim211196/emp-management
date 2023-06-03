import Link from "next/link";
import React, { memo } from "react";

const CustomLink = ({ link, title }) => {
  return (
    <Link sx={{ color: "#fff" }} href={link}>
      {title}
    </Link>
  );
};

export default memo(CustomLink);
