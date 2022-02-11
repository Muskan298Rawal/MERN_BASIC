import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Admin() {
    const [userData, setUserData] = useState([]);
    const [show,setShow] = useState(true);

    const callHomePage = async () => {
        axios.get("api/proxy/getData").then((res)=>{
            setUserData(res.data)
        }).catch((err) => console.log(err))
      };

    const handleDelete = (id) => {
        axios.post("api/proxy/deleteTime", {
            id: id
        }).then((res)=>{
            setShow(false)
            console.log("Shaurya",res.data)
        }).catch((err) => console.log(err))
    }
    
      useEffect(() => {
        callHomePage();
      }, []);
    return (
        <div>
            {userData && userData.map((item) => {
                return (
                    <>                   
                    <div>{item._id}</div>
                    <div>{item.name}</div>
                    <div>{item.area}</div>
                    <div>{item.city}</div>
                    <div>{item.license}</div>
                    <div>{item.pan}</div>
                    {show && <div>{item.time && item.time}         
                        {item.time && <Button onClick={() => handleDelete(item._id)} style={{ background: "green"}}>Remove Time</Button>}
                    </div>}
                    <div>............................................................</div>
                    </>
                )
            })}
        </div>
    )
}

export default Admin
