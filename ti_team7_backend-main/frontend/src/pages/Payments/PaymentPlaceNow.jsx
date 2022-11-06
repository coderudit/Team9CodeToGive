/**
 *
 * @version 1.0
 * @author [Chandan Shukla](chandan.shukla@dal.ca)
 */


import React, {useState} from 'react'
// import {Card} from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { green } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './Payments.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//  import 'bootstrap/dist/css/bootstrap.min.css';
 
 const useStyles = makeStyles({
     root: {
       background: "#1f9264",
       border: 0,
       color: 'white',
       height: 40,
       fontSize: 18,
       width: "100%",
       textTransform: 'none',
       fontWeight: 600,
       "&:hover": {
         background: "#104932",
         color: "#fff"
       }
     },
   });
 

let paymentMethodType = "Credit/Debit Card";
 
 export default function PaymentPlaceNow(props) {
 

    //  const cartItemsData = JSON.parse(localStorage.getItem("bookingDetails"));
    
    let userDetails ;
    let bookingDetails=("bookingDetails" in localStorage?JSON.parse(localStorage.getItem("bookingDetails")):"");
    let charges;
    const [toggle,setToggle] = useState(0);
    
    
    const buttonStyle = useStyles();
    let authToken = "";

    if(localStorage.getItem("token")!=='undefined'){
        authToken = localStorage.getItem("token");
    }
    const [radioButtonSelect,setRadioButton] = React.useState('Standard');
     // const handleRadioButton =(event) => {
     //     dispatch(paymentType(event.target.value));
     // }
    
    
    
     
     
     
 
     console.log("togggle",props.checkBillingAddress)
     async function handlePlaceOrderBtn(){
        if("userDetails" in localStorage){
            userDetails = JSON.parse(localStorage.getItem("userDetails"));

        }
        if("bookingDetails" in localStorage){
            bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
            

        }
        let line_items = [];
        let fullName = bookingDetails.professionalFirstName + " " + bookingDetails.professionalLastName;
        
        charges =  bookingDetails.consulatationCharge*100
        let items = {
            "quantity": 1,
            "price_data": {
                "currency": "cad",
                "unit_amount": charges,
                "product_data": {
                    "name": fullName,
                    "description": "Doctor",
                    "images": [
                        bookingDetails.professionalProfileImg
                    ]
                },
            },
            "tax_rates": ["txr_1KiDYRLF0IW9HE4HAkINXJr6"]
        }
        line_items.push(items);
        let data = {
            line_items,
            "customer_email": userDetails.email,
            "delivery": 10
        };
        let billingAddress;
        
        if(props.checkBillingAddress === false){
            
            let firstName = props.firstNameValue;
            let lastName = props.lastNameValue;
            let streetAddress = props.stAddressValue;
            let city = props.cityNameValue;
            let state = props.stateNameValue;
            let country = props.countryNameValue;
            let zipCode = props.zipCodeValue;
            billingAddress = {
                firstName,
                lastName,
                streetAddress,
                city,
                state,
                country,
                zipCode
            };
        }else{
            console.log("inside secodn");
            let firstName = userDetails.firstName;
            let lastName = userDetails.lastName;
            let streetAddress = userDetails.streetAddress;
            let city = userDetails.city;
            let state = userDetails.state;
            let zipCode = userDetails.zipCode;
            billingAddress = {
                firstName,
                lastName,
                streetAddress,
                city,
                state,
                country: "Canada",
                zipCode
            }
        }


        let payload ={
            totalAmount: charges,
            billingAddress,
            line_items,
            userEmail: userDetails.email
        };
        
         if(paymentMethodType==='Credit/Debit Card'){
             await axios.post('/api/v1/checkout/payment/create-checkout-session',data,{headers: {
                 'Content-Type': 'application/json'
                 }}).then((res) => {
                     console.log(res);
                 if(res && res.data){
                     console.log(res);
                     window.location.href = res.data.sessionUrl;
                     localStorage.setItem("payload", JSON.stringify(payload));
                 }
             });
         }
     }

     
    
     // console.log(paymentMethodType);
   return (
    //  <Card className="textFont" >
    //      <Card.Header className="text-center" ><h4 >Payment Methods</h4></Card.Header>
    //      <Card.Body >
    //          <Card.Title style={{textAlign: 'left'}}>Chose your payment method</Card.Title>
    //          <Card.Title>
    //              <Box component="span" sx={{ display: 'block', mt:2 }}>
    //                  <FormControl>
    //                      <RadioGroup
    //                          aria-labelledby="demo-radio-buttons-group-label"
    //                          defaultValue="Credit/Debit Card"
    //                          name="radio-buttons-group" 
    //                      >
    //                          <FormControlLabel value="Credit/Debit Card" control={<Radio 
                             
    //                          sx={{
    //                              color: blue[800],
    //                              '&.Mui-checked': {
    //                              color: blue[600],
    //                          },
    //                          }}
    //                          />} label="Credit/Debit Card" />
    //                          <FormControlLabel value="Paypal" control={<Radio 
                             
    //                          sx={{
    //                              color: blue[800],
    //                              '&.Mui-checked': {
    //                              color: blue[600],
    //                          },
    //                          }} disabled={true}
    //                          />} label="Paypal (Currently Not Avaialble)" />
                     
                             
    //                      </RadioGroup>
    //                  </FormControl>
 
 
    //              </Box>
    //          </Card.Title>
    //      </Card.Body>
    //      <Card.Footer>
             
    //          <Card.Title style={{textAlign: 'left'}}>Total Amount <span style={{float: "right"}}>Amount</span></Card.Title>
             
    //      </Card.Footer>
    //      <Button variant="contained" className={buttonStyle.root}
    //      onClick={handlePlaceOrderBtn} >Place Order</Button>
    //      {/* <Button variant="primary" className="placeButton" onClick={() => handleNewButton()}>Place Order</Button> */}
    //  </Card>

        <Card  >
            <CardContent sx={{ p: 0 }}>
              <Typography gutterBottom variant="h5" component="div" style={{backgroundColor: '#1f9264', color: '#fff',display: 'flex', 
     alignItems: 'center', 
     justifyContent:'center'}}  > 
              Payment Methods
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{ px: 2 }}>
              Chose your payment method
              <Box component="span" sx={{ display: 'block', mt:2  }}>
                      <FormControl>
                          <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="Credit/Debit Card"
                              name="radio-buttons-group" 
                          >
                              <FormControlLabel value="Credit/Debit Card" control={<Radio 
                             
                             sx={{
                                 color: green[800],
                                 '&.Mui-checked': {
                              color: green[600],
                              },
                              }}
                              />} label="Credit/Debit Card" />
                              <FormControlLabel value="Paypal" control={<Radio 
                             
                             sx={{
                                  color: green[800],
                                  '&.Mui-checked': {
                                 color: green[600],
                             },
                             }} disabled={true}
                              />} label="Paypal (Currently Not Avaialble)" />
                     
                             
                          </RadioGroup>
                      </FormControl>
 
 
                 </Box>
                 Total Amount <span style={{float: "right"}}>{(bookingDetails.consulatationCharge)*1.15}</span>
              </Typography>

              

            </CardContent>
            <Typography variant="h5" component="div" style={{backgroundColor: '#3f51b5', color: '#fff',display: 'flex', 
     alignItems: 'center', 
     justifyContent:'center'}}  > 
              <Button  className={buttonStyle.root} onClick={handlePlaceOrderBtn}>Place Order</Button>
              </Typography>
            
        </Card>
   )
 }
 