import Comments from '../components/Comments';
import Grid from '@mui/material/Grid';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    custom: {
      color: "#00EE00",
      fontWeight: "bold"
    }
  });

const IdeasPage = () => {
    return (
        <div>
            <Grid container
            alignItems="center"
            justifyContent="center"
            direction="column"
            spacing={20}
            >
                <Grid item sx={20} mt={20}>
                    <Grid>Idea Page</Grid>
                </Grid>
                <Grid item sx={20} mt={10}>
                    <Comments />
                </Grid>
                
            </Grid>
            
        </div>
    );
}


export default IdeasPage;
