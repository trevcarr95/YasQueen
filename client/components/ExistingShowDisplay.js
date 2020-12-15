import React from 'react';



const ExistingShowDisplay = (props) => {

  const displayDate = props.date.split(' 00')[0];

  function deleteEntry(body) {
    // console.log('deleteEntry');
    // fetch('/api/delete', {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": 'application/json',
    //       'Accept': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    // })
    // .then(shows => shows.json())
    // .then(shows => {
    //     if (!shows.length) this.setState({
    //         shows: [{
    //             performer: 'No matching results'
    //         }]
    //     })
    //     else {
    //     this.setState({
    //         shows: shows
    //     })
    // }
    // })
    // .catch(err => console.log('THIS IS IN SEARCHPOPUP.JS : ERROR: ', err));
}
  
    return (
    <div className='exists-already-box'>
        <h3 id='performer-name'>{props.performer}</h3>
        <h5>{props.venue} - {props.address}</h5>
        <h5>{displayDate} @ {props.time}</h5>
        <h5>Cover: ${props.cover}</h5>
        {/* <button onClick={deleteEntry} id='delete'>This event no longer exists</button> */}
    </div>
    )
  }


  export default ExistingShowDisplay;