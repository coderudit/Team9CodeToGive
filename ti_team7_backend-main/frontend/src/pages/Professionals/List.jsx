/* Author: Sai Sandeep Mutyala (B00872239) */

import React from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/constants";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import Navbar from '../../Components/NavigationBar/Navbar';
import axios from "axios";
import { AppContext } from "../../context/userContext";
import './List.css';
import { useContext } from "react";


function List() {

  const {
    state: { authenticated, currentUser },
  } = useContext(AppContext);
    let navigate = useNavigate();
    const [list, setList] = useState([]);
        useEffect(() => {
            if (!authenticated) {
              navigate(ROUTES.HOMEPAGE);
            }
        axios.get("/api/experts/displayProfessionals")
        .then((response) => {
            setList(response.data.experts);
        })
    },[1]);
    
    const slotBooking = (id) =>{
      navigate("/slotbooking/" + id)
  }

  return (
    <div>
      <Navbar />  
      <div className='totalcard'>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          style={{ minHeight: '25vh' }}>
          <Grid item xl={5}>
            { list.map(fieldName => (
            <Card className = "singlecard" sx={{ maxWidth: 450 }}>
              <CardMedia
                image={fieldName.url}
                component="img"
                height="200"/>
                  <CardContent>
                    <Typography  variant="h4" component="div">
                      {fieldName.firstName} {fieldName.lastName}
                    </Typography>
                    <Typography component="div">
                      {fieldName.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fieldName.address}
                    </Typography>
                      Charge per appointment: ${fieldName.basePrice}
                  </CardContent>
                  <div className='bookbutton'>
                    <Button className="bookbutton" variant="contained" size="medium" onClick={() => slotBooking(fieldName._id)}>Book</Button>
                  </div>
              </Card>
              ))} 
            </Grid>      
        </Grid>
      </div>
    </div>
  );
}

export default List;


