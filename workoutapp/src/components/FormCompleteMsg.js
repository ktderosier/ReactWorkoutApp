import React from 'react';
import {Redirect} from 'react-router-dom';

function FormCompleteMsg(props) {

    const setHome = () => {
        props.setRedirectHome(true)
    }

    return (
        <React.Fragment>
            {
            props.submitMsg.msg.length > 0 && 
            <React.Fragment>
                <h1>{props.submitMsg.msg}</h1>
                {
                props.submitMsg.state &&
                <button onClick={setHome}>
                    View movie list
                </button>
                }
            </React.Fragment>
            }
            {
            props.redirectHome && <Redirect to="/home" />
            }            
        </React.Fragment>
    )

}

export default FormCompleteMsg;