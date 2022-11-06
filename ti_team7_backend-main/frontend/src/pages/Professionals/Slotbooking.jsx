// Author: Sai Sandeep Mutyala (B00872239)

import * as React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import './List.css';
import Navbar from '../../Components/NavigationBar/Navbar';
import { ROUTES } from '../../common/constants';
import { useNavigate } from "react-router-dom";


function SlotBooking() {
    const params = useParams();
    let navigate = useNavigate();
    const [expertInfo, setExpertInfo] = useState({});
    const apiUrl = '/api/experts/bookProfessional/'+ params.id
    useEffect(() => {
        axios.get(apiUrl).then(
        (response) => {
            setExpertInfo(response.data.expertDetails)
        }
    )
    },[1]);

    const [dateAndTime, setDateAndTime] = React.useState(new Date('2022-04-04T10:00:00'));
    const handleChange = (newValue) => {
        setDateAndTime(newValue);
    };

    const confirmBooking = () =>{
        let itemData = {

            professionalFirstName: expertInfo.firstName,
            professionalLastName: expertInfo.lastName,
            professionalMail: expertInfo.email,
            professionalAddress: expertInfo.address,
            consulatationCharge: expertInfo.basePrice,
            appointmentDataAndTime: dateAndTime,
            professionalProfileImg: expertInfo.url
            }
        localStorage.setItem("bookingDetails", JSON.stringify(itemData))
        navigate(ROUTES.PAYMENTINFOFORM)
    }


  return (
    <div className='main'>
        <Navbar />
        <div className='totalcard'>
            <Grid container spacing={2} direction="column" alignItems="center" justify="center" style={{ minHeight: '25vh' }}>
                <Grid item xl={5}>
                    <Card className = "singlecard" sx={{ maxWidth: 500 }}>
                        <CardMedia component="img" height="200" image={expertInfo.url} />
                        <CardContent>
                            <Typography variant="h4" component="div">
                            {expertInfo.firstName} {expertInfo.lastName}
                            </Typography>
                            <Typography component="div">
                            {expertInfo.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {expertInfo.address}
                            </Typography>
                            Charge per appointment: ${expertInfo.basePrice}
                        </CardContent>
                    </Card>
                </Grid>      
            </Grid>
        </div>
        <div className='dateAndTime'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={4}>
                    <DesktopDatePicker
                        label="Pick appointment date"
                        inputFormat="MM/dd/yyyy"
                        dateAndTime={dateAndTime}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker 
                        label="Pick the time slot for the appointment"
                        dateAndTime={dateAndTime}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
        <div className='bookbutton'>
            <Button size="medium" variant="contained" onClick={() => confirmBooking()}>Confirm Appointment</Button>
        </div>
    </div>
    );
}

export default SlotBooking;
