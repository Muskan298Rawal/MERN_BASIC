import { Button, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

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

    const { user } = useSelector(state => state.userReducer)
    const [error,setError] = useState("")
    const [show,setShow] = useState(true)

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

    const handleTime = (id) => {
        // e.preventDefault();
        axios.post('api/proxy/addTime', {
         time: id,
         contact: user
       })
       .then((response) => {
 
        if(response.status === 200){
            setShow(false)
            console.log(response)
        }
       }, (error) => {
         console.log(error.response.data.error)
         setError(error.response.data.error)
       });
    }

    return (
        <div>
        {/* <Grid xs item={12}> */}
           <Button style={{ background: "blue", position: 'relative', top: "0",
            borderRadius: "5px",
            padding: "10px 30px", color: "#fff"}} onClick={handleLogout}>Logout</Button>
            {/* </Grid> */}
           <h1 className={classes.heading}>Choose Your Time Slot</h1>
           {show 
           ?
            <>
           <Grid container xs={12} className={classes.buttons}>
           <Grid item xs={4} >
               <Button onClick={() => handleTime("10AM-12PM")} style={{ background: "green"}}>10AM-12PM</Button>
           </Grid>
           <Grid item xs={4} >
               <Button onClick={() => handleTime("12PM-2PM")} style={{ background: "orange"}}>12PM-2PM</Button>
           </Grid>
           <Grid item xs={4} >
               <Button onClick={() => handleTime("2PM-4PM")} style={{ background: "blue"}}>2PM-4PM</Button>
           </Grid>
           </Grid>
           <Grid container xs={12} className={classes.buttons}>
           <Grid item xs={6} >
               <Button onClick={() => handleTime("4PM-6PM")} style={{ background: "grey", marginTop: "30px"}}>4PM-6PM</Button>
           </Grid>
           <Grid item xs={6} >
               <Button onClick={() => handleTime("6PM-8PM")} style={{ background: "purple", marginTop: "30px"}}>6PM-8PM</Button>
           </Grid>
           </Grid>
           </> 
           : <p style={{ color: "green" }}>We have saved you Time</p>
           }
           <p style={{ color: "red" }}>{error&& error}</p>
        </div>
    )
}

export default PostLogin
