 /* Author: Sai Sandeep Mutyala (B00872239) */

import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from '@mui/material/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Navbar from "../../Components/NavigationBar/Navbar";
import './PaymentForm.css';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../common/constants';
import { makeStyles } from '@material-ui/core/styles';

const defaultValues = {
    firstname: "",
    lastname:"",
    email:"",
    age: 0,
    gender: "",
    streetAddress:"",
    city:"",
    state:"",
    zipCode:"",
  };

  const useStyles = makeStyles({
    root: {
      background: "#1f9264",
      border: 0,
      color: 'white',
      height: 40,
      fontSize: 18,
      textTransform: 'none',
      fontWeight: 600,
      "&:hover": {
        background: "#104932",
        color: "#fff"
      }
    },
  });

const PaymentInfoForm=() => {
    let navigate = useNavigate();
    const buttonStyle = useStyles();
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    let userData = {

        firstName: formValues.firstname,
        lastName: formValues.lastname,
        email: formValues.email,
        streetAddress: formValues.streetAddress,
        city: formValues.city,
        state: formValues.state,
        zipCode: formValues.zipCode
        }
    localStorage.setItem("userDetails", JSON.stringify(userData))
      alert('Your information got posted!')
      navigate(ROUTES.PAYMENTS);
  };


  return (
    <div>
        <div>
            <Navbar />
        </div>
        <h3>Please fill all the personal details to navigate to payments page.</h3>
        <div className="form">
            <form onSubmit={handleSubmit}>
                
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid className = "field" item>
                        <TextField
                        style = {{width: 500}} 
                        label="First name" color="primary" focused 
                            id="name-input"
                            name="firstname"
                            type="text"
                            value={formValues.firstname}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid className = "field" item>
                        <TextField
                        style = {{width: 500}} 
                        label="Last name" color="primary" focused 
                            id="name-input"
                            name="lastname"
                            type="text"
                            value={formValues.lastname}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid className = "field" item>
                        <TextField
                        style = {{width: 500}} 
                        label="Email" color="primary" focused 
                            id="name-input"
                            name="email"
                            type="text"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid className = "field" item>
                        <TextField
                        label="Age" color="primary" focused 
                            id="age-input"
                            name="age"
                            type="number"
                            value={formValues.age}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid className = "field" item>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                name="gender"
                                value={formValues.gender}
                                onChange={handleInputChange}
                                row
                            >
                            <FormControlLabel
                                key="male"
                                value="male"
                                control={<Radio size="small" />}
                                label="Male"
                            />
                            <FormControlLabel
                                key="female"
                                value="female"
                                control={<Radio size="small" />}
                                label="Female"
                            />
                            <FormControlLabel
                                key="other"
                                value="other"
                                control={<Radio size="small" />}
                                label="Other"
                            />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid className = "field" item>
                        <TextField
                        style = {{width: 500}} 
                        label="Street Address" color="primary" focused 
                            id="name-input"
                            name="streetAddress"
                            type="text"
                            value={formValues.streetAddress}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid className = "field" item>
                        <TextField
                        style = {{width: 500}} 
                        label="City" color="primary" focused 
                            id="name-input"
                            name="city"
                            type="text"
                            value={formValues.city}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid className = "field" item>
                        <TextField
                        style = {{width: 500}} 
                        label="Province/State" color="primary" focused 
                            id="name-input"
                            name="state"
                            type="text"
                            value={formValues.state}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid className = "field" item>
                        <TextField
                        style = {{width: 500, height: 70}} 
                        label="Zip Code" color="primary" focused 
                            id="name-input"
                            name="zipCode"
                            type="text"
                            value={formValues.zipCode}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Button variant="contained" className={buttonStyle.root} type="submit">
                        Submit
                    </Button>
                </Grid>
             </form>
        </div>
    </div>
  );
}

export default PaymentInfoForm;