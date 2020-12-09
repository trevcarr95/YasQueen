import React from 'react';


const ShowDisplay = (props) => {
    return (
    <div className='result-box'>
        <h3 id='performer-name'>{props.performer}</h3>
        <h5>{props.venue} - {props.address}</h5>
        <h5>{props.date} @ {props.time}</h5>
        {/* <h5>{props.time}</h5> */}
        <h5>Cover: ${props.cover}</h5>
        <div className='tip'>
            <a id='venmo' href='www'>Connect to Venmo</a>
        </div>
    </div>
    )
  }


  export default ShowDisplay;