import React from 'react'
import { Button, makeStyles } from "@material-ui/core";
import router from 'next/router'

const useStyle = makeStyles((theme) => ({
    container:{
        justifyContent: "center",
        textAlign: "center",
        marginTop: "25%",
        // marginBottom: "50%"
    },
    register : {
        background: "blue",
        color: "#fff",
        padding: "20px 40px",
        marginRight: "30px",
        "&:hover":{
            background: "blue",
        }
    },
    login : {
        background: "green",
        color: "#fff",
        padding: "20px 40px",
        "&:hover":{
            background: "green",
        }
    }
}))


function PreLogin() {
    const classes = useStyle();

    return (
        <div className={classes.container}>
        <Button className={classes.register} onClick={() => router.push('/signup')}>Register</Button>
        <Button className={classes.login}>Login</Button>
        </div>
    )
}

export default PreLogin
