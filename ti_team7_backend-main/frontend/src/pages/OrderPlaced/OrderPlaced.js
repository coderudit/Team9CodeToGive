import React,{useEffect} from 'react'
import Navbar from '../../Components/NavigationBar/Navbar';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function OrderPlaced() {

    useEffect(() => {
        
        if("payload" in localStorage){
            console.log("inside");
            let payload = JSON.parse(localStorage.getItem("payload"));
            try{
                axios.post('/api/v1/order/createNewOrder',payload).then((res) => {
                    console.log(res);
                    localStorage.removeItem("payload");
                    localStorage.removeItem("bookingDetails");
                    localStorage.removeItem("userDetails");
                })
            }catch(e){

            }
        }
    },[])

  return (
    <div>
        
        <Navbar />
            <Grid 
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '30vh' }}><h1>Order Confirmation</h1></Grid>
                <Box sx={{ flexGrow: 1, mx:8 }} className="textFont" display="flex" justifyContent="center">
                    <Grid item xs={12} lg={5} md={5}  >
                        Thank you for your order!
                        

                    </Grid>
        
                </Box>
                <Box sx={{ flexGrow: 1, mx:8,mt: 4, mb:8 }} className="textFont" display="flex"  justifyContent="center">
                    <Grid item xs={12} lg={5} md={5}  >
                        We've recieved your order and will contact you as soon as your package is shipped. please click below button for your order details.

                    </Grid>
                    
                </Box>
        <Footer />
    </div>
    
  )
}
