import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryIcon from '@mui/icons-material/History';
import Groups from "../../Components/Groups";
import group from "./dump"
import UserFeeds from "../../Components/UserFeeds";
import {useContext, useState} from "react";
import {AppContext} from "../../context/userContext";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component="h1" variant="h5">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserDetail() {
    const {
        state: { authenticated, currentUser },
    } = useContext(AppContext);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
                    <Tab  icon={<VerifiedIcon />} iconPosition="start" label="Feeds" {...a11yProps(0)} />
                    <Tab  icon={<GroupsIcon />} iconPosition="start" label="Groups" {...a11yProps(1)} />
                    <Tab  icon={<MenuBookIcon />} iconPosition="start" label="Overview" {...a11yProps(2)} />
                    <Tab  icon={<HistoryIcon />} iconPosition="start" label="History Activity" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UserFeeds user = {currentUser}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Groups group={group}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Overview
            </TabPanel>
            <TabPanel value={value} index={3}>
                History Activity
            </TabPanel>

        </Box>
    );
}