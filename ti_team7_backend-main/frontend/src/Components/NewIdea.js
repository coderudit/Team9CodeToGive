import React from 'react';
import {Grid, Typography} from "@material-ui/core";

// function component to take user input and store thr value in props, which is passed to the parent component. the input field will be title, description and category 
const NewIdea = (props) => {
    return (
        <div className="new-idea">
            <Grid container
            spacing={3}
            alignItems="center"
            justifyContent="center"
            direction='column'
            >
                <Grid item>
                    <input type="text" placeholder="Title" onChange={(e) => props.setTitle(e.target.value)} />
                </Grid>
                <Grid item>
                    <input type="text" placeholder="Description" onChange={(e) => props.setDescription(e.target.value)} />
                </Grid>
                <Grid item>
                    <input type="text" placeholder="Category" onChange={(e) => props.setCategory(e.target.value)} />
                </Grid>
                    

            </Grid>
            
            
            
        </div>
    )
}

export default NewIdea;