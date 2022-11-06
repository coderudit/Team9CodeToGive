import * as React from "react";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalDialog from "./ModalDialog";
import groups from "../pages/UserProfile/dump";

let friends = [
  { id: "50", email: "chandan@dal.ca", name: "Chandan Shukla" },
  { id: "7", email: "udit@dal.ca", name: "Udit Gandhi" },
  { id: "32", email: "parth@dal.ca", name: "Parth Shah" },
  { id: "42", email: "grace@gmail.com", name: "Grace Gong" },
  { id: "42", email: "Oyindolapo@gmail.com", name: "Oyin Dolapo" }
];
let experts = [
  {
    id: "11",
    name: "expert1",
    email: "expert1@dal.ca",
  },
  {
    id: "12",
    name: "expert2",
    email: "expert2@dal.ca",
  },
  {
    id: "13",
    name: "expert3",
    email: "expert3@dal.ca",
  },
];
const initialValue = {
  groupName: "",
  groupImg: "https://picsum.photos/200",
  groupDesc: "",
  groupMembers: [],
  advisor: {},
};
export default function Groups(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  const handleClickOpen = () => {
    setData(initialValue);
    setOpen(true);
  };
  const handleGroupOpen = (item) => {
    setData(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [`${e.target.name}`]: e.target.value,
    }));
  };
  const handleChangeSelect = (e) => {
    const advisor = experts.find((item) => item.id === e.target.value);
    setData((prevState) => ({
      ...prevState,
      [`${e.target.name}`]: advisor,
    }));
  };
  const handleUpdate = () => {
    groups.forEach((item) => {
      if (item.groupId === data.groupId) {
        Object.keys(data).map((k) => {
          item[k] = data[k];
        });
      }
    });
    setOpen(false);
  };
  const handleMemberUpdate = (item) => {
    setData((prevState) => ({
      ...prevState,
      groupMembers: item,
    }));
  };
  const cardsArray = props.group.map((item, idx) => (
    <Grid item xs={4} key={idx}>
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={item.groupImg}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.groupName}
          </Typography>
          <Typography
            component="p"
            variant="body2"
            color="text.secondary"
            sx={{ overflow: "hidden", textOverflow: "ellipsis", height: 100 }}
          >
            {item.groupDesc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => handleGroupOpen(item)} size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));
  return (
    <>
      <Grid container spacing={2}>
        {cardsArray}
        <Grid item xs={4} variant="outlined">
          <Card
            sx={{
              maxWidth: 345,
              minHeight: 356,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={handleClickOpen}>
              <AddCircleIcon sx={{ fontSize: "50px" }} />
            </IconButton>
          </Card>
        </Grid>
      </Grid>
      <ModalDialog
        open={open}
        onClose={handleClose}
        friends={friends}
        group={data}
        onChange={handleChange}
        onHandleSelect={handleChangeSelect}
        onUpdate={handleUpdate}
        onHandleMemberUpdate={handleMemberUpdate}
        experts={experts}
      />
    </>
  );
}
