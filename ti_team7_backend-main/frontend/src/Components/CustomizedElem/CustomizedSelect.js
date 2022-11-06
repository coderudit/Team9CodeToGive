import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {MenuItem, Select} from "@mui/material";


const BootstrapInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(2),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 12,
        width: '100%',
        padding: '7px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
            borderRadius: 4,
        },
    },
    '& .MuiSelect-select[readonly]': {
        backgroundColor: '#e1e1e1',
    }
}));
export default function CustomizedSelect(props) {
    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-customized-select-label">{props.defaultLabel}</InputLabel>
            <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                name={props.name}
                value={(props.value&&props.value.id)?props.value.id:''}
                defaultValue = ""
                input={<BootstrapInput/>}
                MenuProps={{
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                }}

                onChange={props.onChange}>
                {(props.data?.map((item, idx) => {
                        return (
                            <MenuItem key={idx} value={item.id}>
                                {item.name}
                            </MenuItem>
                        );
                    }
                ))}
            </Select>
        </FormControl>
    );
}