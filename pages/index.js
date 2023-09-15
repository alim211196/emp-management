import Header from "@/utils/Header";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import React from "react";

const HomePage = () => {
  return (
    <Box
      sx={{
        transition: "0.3s",
        position: "relative",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url(https://source.unsplash.com/random/?city,evening)`,
        p: 4,
      }}
    >
      <Header />

      <Box sx={{ p: 2, mt: 8, background: "rgba(255, 255, 255, 0.8)" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Insightful Musings: A Blog by Our Dedicated Team
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to Insightful Musings, a captivating blog crafted by our
          exceptional team of employees and administrators. Join us on a journey
          of knowledge and discovery as we delve into a wide range of topics,
          offering unique perspectives and thought-provoking insights. At
          Insightful Musings, we are passionate about sharing our expertise,
          experiences, and opinions with our readers. Whether you are seeking
          guidance on personal growth, exploring the latest trends in
          technology, or looking for travel inspiration, our blog covers it all.
          Our diverse team brings together a wealth of knowledge and a shared
          commitment to providing valuable and engaging content. Through our
          carefully curated articles, we aim to inspire, inform, and entertain
          you. Discover practical tips, in-depth analysis, and engaging
          narratives that will keep you coming back for more. Our blog fosters a
          welcoming and interactive community, where you can actively
          participate by sharing your thoughts and engaging in discussions with
          our writers and fellow readers. Stay up to date with the latest posts
          by subscribing to our newsletter or following us on social media.
          Unlock a world of captivating storytelling and insightful perspectives
          at Insightful Musings. Embark on this enriching journey with us, and
          let our blog become your trusted source of knowledge, inspiration, and
          entertainment. Happy reading!
        </Typography>
        <List component="nav" aria-label="Blog categories">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="All Articles" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary="Category 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary="Category 2" />
          </ListItem>
        </List>
        <Typography variant="h6" component="h2" gutterBottom>
          Popular Articles
        </Typography>
        <List component="ul">
          <ListItem button>
            <ListItemText primary="Article 1" secondary="Category 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Article 2" secondary="Category 2" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Article 3" secondary="Category 1" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default HomePage;
