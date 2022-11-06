import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {Alert, Badge, CardActions, CardHeader, Divider, Snackbar, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import {Typography} from "@material-ui/core";
import Box from "@mui/material/Box";

export default function UserFeeds(props) {
    const [feedList, setFeedList] = useState([]);
    const [feedMsg, setFeedMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("")
    useEffect(() => {
        setFeedMsg("");
        getData();
    }, []);
    const getData = () => {
        axios.get(`/api/feed/profile/${props.user.firstName}`)
            .then((response) => {
                if (response.data.success)
                    setFeedList(response.data.feeds);
            })
    }

    const handleChange = (e) => {
        setFeedMsg(e.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const data = {'userName': props.user.firstName, "feedText": feedMsg}
            axios.post(`/api/feed/`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        setOpen(true);
                        setMsg(response.data.message)
                        setFeedMsg("")
                        getData();
                    }
                })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    return (
        <>
            <Box mb={5}>
                <p style={{display: 'inline-flex', width: '100%'}}>
                <h4 style={{color: "rgb(26, 55, 77)"}}> What's on your
                    mind?</h4><h5 style={{color: "rgb(26, 55, 77, 0.8)"}}>(Press enter to post!)</h5>
                </p>
                <Grid container spacing={3} ml={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-helperText"
                            label="Feed Message"
                            value={feedMsg}
                            fullWidth
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <h4 style={{color: "rgb(26, 55, 77)", paddingTop: '20px', paddingBottom: '10px'}}> Latest Updates </h4>
                <Grid container mt={3} spacing={3}>
                    {feedList && feedList.map((feed, idx) => (
                            <Grid item xs={4} key={idx}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{width: '50px', height: '50px'}}
                                                    src={"https://i.pravatar.cc/300?img=38"}> </Avatar>
                                        }
                                        title={feed.userName}
                                        subheader={feed.createdAt}
                                    />
                                    <CardContent>
                                        <Typography variant="body2">
                                            {feed.feedText}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Badge color="primary" badgeContent={feed.congratsBadge}>
                                            🎊
                                        </Badge>
                                        <Badge color="primary" badgeContent={feed.fabBadge}>
                                            ⭐
                                        </Badge>
                                        <Badge color="primary" badgeContent={feed.perfectBadge}>
                                            💯
                                        </Badge>
                                        <Badge color="primary" badgeContent={feed.awesomeBadge}>
                                            🙌
                                        </Badge>
                                        <Badge color="primary" badgeContent={feed.yaayBadge}>
                                            🤗
                                        </Badge>
                                        <Badge color="primary" badgeContent={feed.applauseBadge}>
                                            👏
                                        </Badge>
                                        <Badge color="primary" badgeContent={feed.celebrteBadge}>
                                            🎉
                                        </Badge>
                                        <Badge color="primary" badgeContent={feed.strongBadge}>
                                            💪
                                        </Badge>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    )}
                </Grid>
            </Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: "100%"}}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}
