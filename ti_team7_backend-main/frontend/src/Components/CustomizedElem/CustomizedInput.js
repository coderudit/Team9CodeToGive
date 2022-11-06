import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


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
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `${alpha('#042a63', 0.25)} 0 0 0 0.2rem`,
            borderColor: "#042a63",
            color: "#042a63"
        },
    },
    '& .MuiInputBase-input[readonly]': {
        backgroundColor: '#e1e1e1',
    }
}));
const HelperText = (props) => {
    return (props.error)?(<span>This field is required.</span>):""
}
export default function CustomizedInput(props) {
    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel shrink htmlFor="bootstrap-input" >
                {props.defaultLabel}
            </InputLabel>
            <BootstrapInput
                id="bootstrap-input"
                name={props.name}
                value={props.value}
                readOnly={props.IsReadOnly}
                onChange={e => props.onChange(e)}
                sx="small"
            />
            {(props.required)?(
                <HelperText error={props.error}/>
            ):""}
        </FormControl>
    );

}