import { Button, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React from 'react'
import router from 'next/router';
import { useDispatch } from 'react-redux';

const useStyle = makeStyles((theme) => ({
    buttons: {
        justifyContent: "center",
        "& button": {
            borderRadius: "5px",
            padding: "10px 30px",
            color: "#fff"
        }
    },
    heading: {
        color: "black",
        margin: "20px",
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
    },
}))

function PostLogin() {

    const classes = useStyle();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // if(typeof window !== "undefined"){
        //     localStorage.setItem("userLoggedIn", false)
        // }
        dispatch({ type: "REMOVE_USER", payload: ""})
        axios.get('api/proxy/logout')
        .then((res)=>{
            router.push('/')
            if(!res.status === 200 ) {
                const error =  new  Error(res.err);
                throw error;
            }
        })
        .catch((err)=> console.log(err))
    }

    return (
        <div>
        {/* <Grid xs item={12}> */}
           {/* <Button style={{ background: "blue", position: 'relative', top: "0",
            borderRadius: "5px",
            padding: "10px 30px", color: "#fff"}} onClick={handleLogout}>Logout</Button> */}
            {/* </Grid> */}
           <h1 className={classes.heading}>Choose Your Time Slot</h1>
           <Grid container xs={12} className={classes.buttons}>
           <Grid item xs={4} >
               <Button style={{ background: "green"}}>10AM-12PM</Button>
           </Grid>
           <Grid item xs={4} >
               <Button style={{ background: "orange"}}>12PM-2PM</Button>
           </Grid>
           <Grid item xs={4} >
               <Button style={{ background: "blue"}}>2PM-4PM</Button>
           </Grid>
           </Grid>
           <Grid container xs={12} className={classes.buttons}>
           <Grid item xs={6} >
               <Button style={{ background: "grey", marginTop: "30px"}}>4PM-6PM</Button>
           </Grid>
           <Grid item xs={6} >
               <Button style={{ background: "purple", marginTop: "30px"}}>6PM-8PM</Button>
           </Grid>
           </Grid>
        </div>
    )
}

export default PostLogin
