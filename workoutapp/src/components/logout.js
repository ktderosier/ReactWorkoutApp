import React, {useState} from 'react';
import Badge from 'react-bootstrap/Badge'
import { Link } from "react-router-dom";


const LogoutView = () => {

    return (
       <div><p>Logged out</p>
       <Link to={'/log-in'}>
       <Badge variant="primary">Log in</Badge>
       </Link>
         

       
       </div>
    )
  }

export default LogoutView;