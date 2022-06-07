import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";

function Circle() {
  return (
    <ImageList
      variant="masonry"
      sx={{ height: 300, overflowY: "scroll" }}
      cols={4}
      gap={0}
      display="flex"
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img.toString()}>
          <img
            src={`${item.img}?fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "assets/Circle_fifths.png",
    title: "Circle of Fifths",
  },
  {
    img: "assets/c-major-c-minor.png",
    title: "minor/major",
  },
];

export default Circle;
