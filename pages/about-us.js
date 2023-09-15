import Header from "@/utils/Header";
import { Box, Typography } from "@mui/material";
import React from "react";

const AboutUs = () => {
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
        <Typography variant="h6" component="h3" gutterBottom>
          About Us:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to our blog, where knowledge meets inspiration. At [Blog
          Website Name], we are passionate about creating a platform that
          fosters learning, growth, and connection. Our dedicated team of
          writers and contributors are committed to delivering engaging and
          informative content that sparks curiosity and encourages meaningful
          discussions.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          What We Believe:
        </Typography>
        <Typography variant="body1" gutterBottom>
          We believe that knowledge should be accessible to everyone. Our
          mission is to empower individuals with the information they need to
          make informed decisions, gain new perspectives, and explore their
          passions. We strive to create a diverse and inclusive community where
          people from all walks of life can come together to learn, share, and
          grow.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          What We Offer:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Our blog covers a wide range of topics to cater to various interests
          and curiosities. From insightful articles on personal development,
          technology, health, and lifestyle, to captivating travel stories and
          thought-provoking analysis of current events, we aim to provide a rich
          and diverse reading experience.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Our Approach:
        </Typography>
        <Typography variant="body1" gutterBottom>
          We take pride in our commitment to producing high-quality content. Our
          team of experienced writers and subject matter experts thoroughly
          research each topic to ensure accuracy and reliability. We strive to
          present information in a clear, engaging, and accessible manner,
          making complex ideas easy to understand and enjoyable to read.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Community Engagement:
        </Typography>
        <Typography variant="body1" gutterBottom>
          We believe that the power of our blog lies in the connections we
          create with our readers. We encourage active participation and
          engagement from our community. Through comments, social media
          interactions, and reader submissions, we aim to foster a vibrant and
          interactive space where ideas can be shared and discussed openly.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Join Us:
        </Typography>
        <Typography variant="body1" gutterBottom>
          We invite you to be a part of our growing community. Subscribe to our
          newsletter to receive regular updates, curated content, and exclusive
          offers. Connect with us on social media platforms to stay up-to-date
          with the latest articles and engage with fellow readers. Thank you for
          visiting [Blog Website Name]. We hope you find our blog a source of
          inspiration, knowledge, and entertainment. Together, let is embark on a
          journey of exploration and discovery. Happy reading!
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
