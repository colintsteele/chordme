import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ height: "auto", width: "100%" }} borderBottom={1}>
      <Box x={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          align="center"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {itemData.map((item, i) => (
            <Tab key={item.key} label={item.key} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>

      {itemData.map((item, i) => (
        <TabPanel key={item.key} align="center" value={value} index={i}>
          <img
            height={"240vh"}
            src={item.img}
            key={item.key}
            alt={item.title}
          />
        </TabPanel>
      ))}
    </Box>
  );
}

const itemData = [
  {
    key: "circle",
    img: "assets/Circle_fifths.png",
    title: "Circle of Fifths",
  },
  {
    key: "minor-major",
    img: "assets/c-major-c-minor.png",
    title: "minor/major",
  },
  {
    key: "grandstaff",
    img: "assets/grandstaffnotechartmidc.jpeg",
    title: "all notes!",
  },
];
