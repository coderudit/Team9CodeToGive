import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core/styles";
import NewIdea from '../../Components/NewIdea';
import React, {useState,useEffect} from 'react';
import axios from 'axios';

const useStyles = makeStyles({
    custom: {
      color: "#00EE00",
      fontWeight: "bold"
    }
  });

const SubmitIdea = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    let userDetails ;

    // console.log(title, description, category);

    // function to make post  request to backend to save the idea using axios
    const submitIdea = () => {

        if("USER" in localStorage){
            userDetails = JSON.parse(localStorage.getItem("USER"));
        }

        let newIdea = {
            title,
            type: category,
            userEmail: userDetails.email,
            body: description
        };

        console.log(title, description, category);
        axios.post('http://localhost:5000/ideas', newIdea)
        .then((response) => {
            if(response && response.data){
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    


    return (
        <div>
            <Grid container
            alignItems="center"
            justifyContent="center"
            direction="column"
            spacing={10}
            >
                <Grid item sx={20} mt={10}>
                    <Grid>Idea Page</Grid>
                </Grid>
                <Grid item sx={20} mt={5}>
                    <NewIdea setTitle={setTitle} setDescription={setDescription} setCategory={setCategory} />
                </Grid>
                <Grid item sx={20} mt={5}>
                    <button onClick={submitIdea}>Submit Idea</button>
                </Grid>
                
            </Grid>
            
        </div>
    );
}


export default SubmitIdea;
