import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { blueGrey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';

export default function Post({item: {title, body,type, userEmail}}) {
  return (
    <Card sx={{ width: '70%' }} style={{backgroundColor: "#B1D0E0"}}>
        <CardContent>
            <Grid>
                <Typography gutterBottom variant="h3" component="div"
                    sx={{
                        color: blueGrey[800]
                    }}
                >
                {title}
                </Typography>
            </Grid>
            
            <Typography gutterBottom variant="h6" component="div"
                sx={{
                    color: blueGrey[500],
                }}
            >
            {body}
            </Typography>
            <Typography gutterBottom variant="h10" component="div"
            sx={{
                color: blueGrey[700],
            }}
            >
            {userEmail.split('@')[0]}
            </Typography>
        {/* <CardActions>
            <Button size="small" onClick={() => handleAddToCart(productName,productPrice,productBrand,productImage)}>Add to Cart</Button>
        </CardActions> */}
        </CardContent>
    </Card>

  )
}
