import React, {useContext, useEffect, useState} from "react";
import NavigationBar from "./NavigationBar/Navbar";
import {Typography} from "@material-ui/core";
import {AppContext} from "../context/userContext";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../common/constants";
import axios from "axios";
import {Alert, Snackbar} from "@mui/material";
import Container from "@mui/material/Container";
import FeedCard from "./FeedCard";

const Feed = () => {

    const {state: {authenticated, currentUser},} = useContext(AppContext);
    const [feedList, setFeedList] = useState([])
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("")

    let navigate = useNavigate();
    if (!authenticated) {
        navigate(ROUTES.HOMEPAGE);
    }
    useEffect(() => {
        if (!authenticated) {
            navigate(ROUTES.HOMEPAGE);
        }
        axios.get(`/api/feed/${currentUser.firstName}`)
            .then((response) => {
                if (response.data.success)
                    setFeedList(response.data.feeds);
            })
    }, []);
    const handleClick = (label, id) => {
        const data = {'badge' : label }
        axios.put(`/api/feed/${id}`,data,{headers: {
                'Content-Type': 'application/json'
            }})
            .then((response) => {
                if (response.data.success){
                    setOpen(true);
                    setMsg(response.data.message)
                }
            })
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    return (
        <>
            <NavigationBar/>
            <Container maxWidth="lg">
                <Typography align="center" variant="h4" style={{color: "#406882", padding: '20px'}}> Latest Updates </Typography>
                <FeedCard onHandleClick = {handleClick} feedList = {feedList}/>
            </Container>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Feed;
