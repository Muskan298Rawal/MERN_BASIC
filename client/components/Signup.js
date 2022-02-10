import * as React from 'react';
import {Box, Button, makeStyles, TextField} from '@material-ui/core';
import router from 'next/router'


const useStyle = makeStyles((theme) => ({
    submit : {
        background: "blue",
        color: "#fff",
        padding: "10px 60px",
        marginTop: "20px",
        "&:hover":{
            background: "blue",
        }
    }
}))


function Signup() {
    const classes = useStyle();

  const [users, setValues] = React.useState({
    name: '',
    contact: 0,
    area: '',
    city: '',
    license: '',
    pan: '',
  });

  const handleChange = (event) => {
    setValues({ ...users, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, contact, area, city, license, pan} = users;
    const res = await fetch('api/proxy/register',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            name, contact, area, city, license, pan
        })
    })
    const data = await res.json();

    if(res.status === 422 || !data) {
      window.alert("Registration failed")
    }
    else{
      console.log(data);
      window.alert("User Registered Successfully")
      router.push('/login')
    }
  }

  return (
      <>
      <div>
      <Box
      sx={{
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        marginTop: "2em",
        '& > :not(style)': { m: 1 },
      }}>
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
      <Button className={classes.submit} onClick={handleSubmit}>Submit</Button>
      </Box>
      </div>
      </>
  );
}

export default Signup

