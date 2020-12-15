import React, { Component } from 'react';
import { Button, Grid, Input, Popup, Header } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import '../css/styles.css';


class ShowDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      address: this.props.address,
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(body) {
    console.log('deleteEntry');
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



  render () {
    const displayDate = this.props.date.split(' 00')[0];

    const Map = ({ location, zoomLevel }) => (
      <div className='google-container'>
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB2-tJwgbWFOaCav59-Z8vZ4Poi80Fcz6g' }}
            defaultCenter={{lat: this.props.latitude, lng: this.props.longitude}}
            defaultZoom={zoomLevel}
          >
            <LocationPin
              lat={location.latitude}
              lng={location.longitude}
              text={location.address}
            />
          </GoogleMapReact>
        </div>
      </div>
    )

    const LocationPin = ({ text }) => (
      <div className="pin">
        <Icon icon={locationIcon} className="pin-icon" />
        <p className="pin-text">{text}</p>
      </div>
    )
  

    return (
    <div className='result-box'>
        <h3 id='performer-name'>{this.props.performer}</h3>
        <h5>{this.props.venue} - {this.props.address}</h5>
        <h5>{displayDate} @ {this.props.time}</h5>
        <h5>Cover: ${this.props.cover}</h5>
        <Popup style={{width: '200px', zIndex: 1, backgroundColor:'whitesmoke', color: 'black', borderStyle:'solid', borderColor: 'lightBlue', textAlign:'center'}} offset={[70,0]}  trigger={<Button id='tip'>Venmo {this.props.performer}</Button>} flowing hoverable>
    <Grid centered divided columns={3}>
      <Grid.Column textAlign='center'>
        <Header style={{margin: '0px', marginTop: '5px'}} as='h4'>She's cute</Header>
        <Button>$5 tip</Button>
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Header style={{margin: '0px', marginTop: '5px'}} as='h4'>I love her!</Header>
        <Button>$10 tip</Button>
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Header style={{margin: '0px', marginTop: '5px'}} as='h4'>My absolute ICON</Header>
        <Button>$20 tip</Button>
      </Grid.Column>
    </Grid>
  </Popup>
  <Map className='google-map' location={this.state} zoomLevel = {15}/>
    </div>
    )
    
  }
}


  export default ShowDisplay;