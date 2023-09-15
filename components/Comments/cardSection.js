import { CardName } from "@/utils/CustomFunction";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardSection = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card elevation={3}>
      <CardActionArea>
        <CardMedia
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
            pt: 2,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              fontSize: "40px",
            }}
          >
            {CardName(`${item.fullname}`)}
          </Avatar>
        </CardMedia>
        <CardContent sx={{ pl: 2, pr: 2, pt: 0, pb: 0 }}>
          <Typography gutterBottom variant="h5" component="div">
            {item?.fullname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item?.email}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {item?.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          pl: 2,
          pr: 2,
          pt: 0,
          pb: 1,
        }}
      >
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "#1976D2" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comment:</Typography>
          <Typography paragraph>{item?.comment}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default memo(CardSection);
