import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import PostList from './PostList';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Posts() {
    const [postData,setPostData] = useState([]);

    useEffect(() => {
        axios.get('/api/posts/getAllPosts').then((res) => {
            // console.log(res);
            setPostData(res.data.posts);
        })
    },[])

    console.log(postData);

    return (
        <div>
            <Box container mt={8} sx={{ justifyContent: 'center', alignContent: 'center' }}  >
                <Grid container
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                >
                            <Typography gutterBottom variant="h3" component="div">
                            Trending Ideas
                    </Typography>
                    {/* <h1 style={{marginBottom: "50px"}}></h1> */}
                </Grid>
                
                <PostList list={postData} />
          </Box>

        </div>
    )
}
