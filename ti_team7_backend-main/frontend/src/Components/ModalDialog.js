import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomizedInput from "./CustomizedElem/CustomizedInput";
import CustomizedMultiple from "./CustomizedElem/CustomizedMultiple";
import {DialogContent} from "@mui/material";
import CustomizedSelect from "./CustomizedElem/CustomizedSelect";
import TransferList from "./TransferList";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import groups from "../pages/UserProfile/dump";


const initialValue = {
    groupName: '',
    groupImg: 'https://picsum.photos/id/106/200',
    groupDesc: '',
    groupMembers: [],
    advisor: {},
}
export default function ModalDialog(props) {
    const [data, setData] = useState({});
    useEffect(() => {
        if (props.group)
            setData(props.group)
        else
            setData(initialValue)
    })
    const handleClose = () => {
        props.onClose(false);
    };

    const handleSubmit = () => {
        groups.push(data);
        handleClose()
    }
    return (
        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle>Create a new group</DialogTitle>
            <DialogContent>
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CustomizedInput
                                defaultLabel="Enter group name"
                                name="groupName"
                                value={data.groupName}
                                onChange={props.onChange}
                                IsReadOnly={false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomizedMultiple
                                defaultLabel="Enter a description (optional)"
                                name="groupDesc"
                                value={data.groupDesc}
                                onChange={props.onChange}
                                IsReadOnly={false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomizedSelect
                                required
                                defaultLabel="Select an advisor"
                                name="advisor"
                                value={data.advisor}
                                data={props.experts}
                                onChange={props.onHandleSelect}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TransferList friends={props.friends} member={data.groupMembers} onHandleGroup ={props.onHandleMemberUpdate}/>
                        </Grid>
                        <Grid item xs={12}>
                            {( !data.groupId || data.groupId === '' ) ?
                                (<Button variant="contained" sx={{width: '100%'}} onClick={handleSubmit}>
                                    Create Group
                                </Button>)
                                :
                                (<Button variant="contained" sx={{width: '100%'}} onClick={props.onUpdate}>
                                    Edit Group
                                </Button>)
                            }
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
