import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core/styles";
import NewIdea from '../../Components/NewIdea';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from '../../Components/NavigationBar/Navbar';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    custom: {
      color: "#00EE00",
      fontWeight: "bold"
    },
    root: {
        background: "#1A374D",
        border: 0,
        color: 'white',
        height: 40,
        fontSize: 18,
        textTransform: 'none',
        fontWeight: 600,
        "&:hover": {
          background: "#6998AB",
          color: "#fff"
        }
      },
  });


const SubmitIdea = () => {
    const buttonStyle = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    let userDetails ;

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
        axios.post('/api/posts/addPost', newIdea)
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
            <Navbar />  
            <Grid container
            alignItems="center"
            justifyContent="center"
            direction="column"
            spacing={10}
            >
                <Grid item sx={{pt: 200}} >
                    <h1 style={{ marginTop: "100px" }}>Idea Page</h1>
                </Grid>
                <Grid item sx={{borderRadius: 2, boxShadow: 2}}
                >
                    <NewIdea setTitle={setTitle} setDescription={setDescription} setCategory={setCategory} />
                </Grid>
                <Grid item sx={20}>
                    {/* <button onClick={submitIdea}></button> */}
                    <Button variant="contained" className={buttonStyle.root} onClick={submitIdea} type="submit">
                        Submit Idea
                    </Button>
                </Grid>
                
            </Grid>
            
        </div>
    );
}


export default SubmitIdea;
