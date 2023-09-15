import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  borderRadius: "50%",
  background: "#474747",
  color: "white",
  width: "50px",
  height: "50px",
  "&:hover": {
    background: "#474747",
  },
  opacity: 0,
  visibility: "hidden",
  transition: "all 0.3s ease",
  // Define your styles for the visible state
  "&.Mui-fab-visible": {
    opacity: 1,
    visibility: "visible",
  },
}));

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ScrollToTopFab
      className={isVisible ? "Mui-fab-visible" : ""}
      onClick={scrollToTop}
    >
      <KeyboardArrowUpIcon />
    </ScrollToTopFab>
  );
}

export default ScrollButton;
