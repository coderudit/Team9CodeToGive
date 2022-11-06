import * as React from 'react';
import {styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
    },
    '& .MuiInputBase-input[readonly]': {
        backgroundColor: '#e1e1e1',
    }
}));
const HelperText = (props) => {
    return (props.error)?(<span>This field is required.</span>):""
}
export default function CustomizedMultiple(props) {
    return (
            <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="bootstrap-input">
                    {props.defaultLabel}
                </InputLabel>
                <BootstrapInput
                    id="outlined-multiline-flexible"
                    name={props.name}
                    fullWidth
                    multiline
                    rows={2}
                    readOnly={props.IsReadOnly}
                    sx="small"
                    onChange={e => props.onChange(e)}
                    value={props.value ||''}
                >
                </BootstrapInput>
                {(props.required)?(
                    <HelperText error={props.error}/>
                ):""}
            </FormControl>
    );
}