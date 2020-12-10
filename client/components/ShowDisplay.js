import React from 'react';
import { Button, Grid, Input, Popup, Header } from 'semantic-ui-react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';


const ShowDisplay = (props) => {

    let FavIcon;
//   if (isFav) FavIcon = (<span className="favIcon"><FAIcon onClick={() => favClicked(id)} icon={solidStar} style={{ color: 'steelblue' }} /></span>);
//   else FavIcon = (<span className="favIcon"><FAIcon onClick={() => favClicked(id)} icon={regStar} /></span>);

  FavIcon = (<span className="favIcon"><FAIcon onClick={() => favClicked(id)} icon={regStar} style={{ color: 'steelblue' }} /></span>);

    return (
    <div className='result-box'>
        {/* {FavIcon} */}
        <h3 id='performer-name'>{props.performer}</h3>
        <h5>{props.venue} - {props.address}</h5>
        <h5>{props.date} @ {props.time}</h5>
        <h5>Cover: ${props.cover}</h5>
        <Popup style={{width: '200px', zIndex: 1, backgroundColor:'lightBlue', color: 'black', borderStyle:'solid', textAlign:'center'}} offset={[70,0]} trigger={<Button id='tip'>Venmo {props.performer}</Button>} flowing hoverable>
    <Grid centered divided columns={3}>
      <Grid.Column textAlign='center'>
        <Header as='h4'>She's cute</Header>
        <Button>$5 tip</Button>
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Header as='h4'>I love her!</Header>
        <Button>$10 tip</Button>
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Header as='h4'>My absolute ICON</Header>
        <Button>$20 tip</Button>
      </Grid.Column>
    </Grid>
  </Popup>
    </div>
    )
  }


  export default ShowDisplay;