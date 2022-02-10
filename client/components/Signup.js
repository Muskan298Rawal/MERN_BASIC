import * as React from 'react';
import {Box, Button, makeStyles, TextField} from '@material-ui/core';
import router from 'next/router'
import axios from 'axios';


const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiButton-root.Mui-disabled":{
        background: "grey",
      }
    },
    submit : {
        background: "blue",
        color: "#fff",
        padding: "10px 60px",
        marginTop: "20px",
        "&:hover":{
            background: "blue",
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


function Signup() {
    const classes = useStyle();
    const [error, setError] = React.useState("");

  const [users, setValues] = React.useState({
    name: '',
    contact: '',
    area: '',
    city: '',
    license: '',
    pan: '',
  });
  

  const handleChange = (event) => {
    setError(" ")
    setValues({ ...users, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, contact, area, city, license, pan} = users;
    axios.post('api/proxy/register', {
      name, contact, area, city, license, pan
    })
    .then((response) => {
      console.log(response);
      window.alert("User Registered Successfully")
      router.push('/login')
    }, (error) => {
      console.log(error.response.data.error);
      setError(error.response.data.error)
    });
  }

  return (
      <>
      <div className={classes.root}>
      <h1 className={classes.heading}>Registration</h1>
      <Box
      sx={{
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        marginTop: "2em",
        '& > :not(style)': { m: 1 },
      }}
      className={classes.box}>
       <TextField
        label="Name"
        type="text"
        id="name"
        onChange={handleChange}
      />
      <TextField
        label="Contact Number"
        onChange={handleChange}
        type="number"
        id="contact"
      />
       <TextField
        label="Area"
        onChange={handleChange}
        id="area"
      />
       <TextField
        label="City"
        onChange={handleChange}
        id="city"
      />
       <TextField
        label="Driving License Number"
        onChange={handleChange}
        id="license"
      />
       <TextField
        label="PAN Number"
        onChange={handleChange}
        id="pan"
      />
       <p style={{ color: "red" }}>{ error && error}</p>
      <Button disabled={!users.name || !users.contact || !users.city || !users.area || !users.license || !users.pan } className={classes.submit} onClick={handleSubmit}>Submit</Button>
      </Box>
      </div>
      </>
  );
}

export default Signup

