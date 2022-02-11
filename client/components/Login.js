import * as React from 'react';
import {Box, Button, makeStyles, TextField} from '@material-ui/core';
import router from 'next/router'
import axios from 'axios';
import { useDispatch } from 'react-redux';



const useStyle = makeStyles((theme) => ({
    root: {
        "& .MuiButton-root.Mui-disabled":{
            background: "grey",
        }
    },
    submit : {
        background: "green",
        color: "#fff",
        padding: "10px 60px",
        marginTop: "20px",
        "&:hover":{
            background: "green",
        }
    },
    heading: {
      color: "black",
      margin: "20px",
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
    },
    box: {
      "& div": {
        marginTop: "10px"
      }
    }
}))


function Login() {
    const classes = useStyle();

  const [users, setValues] = React.useState({
    contact: '',
  });
  const [error, setError] = React.useState("");

  const dispatch = useDispatch()

  const handleChange = (event) => {
    setError(" ");
    setValues({ ...users, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       const { contact } = users;
       axios.post('api/proxy/login', {
        contact
      })
      .then((response) => {

        if(response.status === 200){
            let contact = JSON.parse(response.config.data);
            let finalContact = contact.contact;
            dispatch({ type: "SET_USER", payload: finalContact });
        }
          console.log("Muskan", response)
        router.push('/')
      }, (error) => {
        console.log(error.response.data.error)
        setError(error.response.data.error)
      });
       

  }

  return (
      <>
      <div className={classes.root}>
      <h1 className={classes.heading}>Login</h1>
      <Box
      sx={{
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        marginTop: "2em",
        '& > :not(style)': { m: 1 },
      }}>
      <TextField
        label="Contact Number"
        onChange={handleChange}
        type="number"
        id="contact"
      />
      <p style={{ color: "red" }}>{error && error}</p>
      
      <Button disabled={users.contact.length < 10} className={classes.submit} onClick={handleSubmit}>Submit</Button>
      </Box>
      </div>
      </>
  );
}

export default Login

