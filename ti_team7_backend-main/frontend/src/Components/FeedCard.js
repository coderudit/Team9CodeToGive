import React from "react";
import {Grid, Typography} from "@material-ui/core";
import Card from "@mui/material/Card";
import {CardActions, CardHeader} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import {ReactionBarSelector} from "@charkour/react-reactions";

export default function FeedCard(props) {
    const buildNode = (emoji) => <div>{emoji}</div>;
    const reactions = [{label: "congratsBadge", node: buildNode("🎊")},
        {label: "fabBadge", node: buildNode("⭐")},
        {label: "perfectBadge", node: buildNode("💯")},
        {label: "awesomeBadge", node: buildNode("🙌")},
        {label: "yaayBadge", node: buildNode("🤗")},
        {label: "applauseBadge", node: buildNode("👏")},
        {label: "celebrteBadge", node: buildNode("🎉")},
        {label: "strongBadge", node: buildNode("💪")}
    ]
    return (
        <>
            <Grid container spacing={3}>
                {props.feedList && props.feedList.map((feed, idx) => (
                        <Grid item xs={4}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{width: '50px', height: '50px'}}
                                                src={"https://i.pravatar.cc/300?img=" + idx}> </Avatar>
                                    }
                                    title={feed.userName}
                                    subheader={feed.createdAt}
                                />
                                <CardContent>
                                    <Typography variant="body2">
                                        {feed.feedText}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{paddingLeft: '9%'}}>
                                    <ReactionBarSelector reactions={reactions}
                                                         onSelect={e => props.onHandleClick(e, feed.feedId)}
                                                         iconSize={'20px'}/>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </>
    );
}