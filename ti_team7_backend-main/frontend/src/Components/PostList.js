import React from 'react';
import Grid from '@mui/material/Grid';
import Post from './Post';



export default function PostList({list}) {
  return (
    <div>
      <Grid container spacing={15} direction="column" sx = {{mt: 1}}>
          {list.map((item) => (
                  
                    <Grid container item xs={12} sm={6} md={3} lg={3} justifyContent="center">
                      <Post key={item.id} item={item} />
                    </Grid>     
                  )
              )
          }
        </Grid>
    </div>

  )
}
