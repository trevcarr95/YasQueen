import React, { Component } from 'react';
import SubmitPopUp from './SubmitPopUp';
import SearchPopUp from './SearchPopUp';
import ShowDisplay from './ShowDisplay';
import '../css/styles.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
            search: false,
            shows: [],
            city: ''
        };
        this.toggleSubmit = this.toggleSubmit.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.fetchRequest = this.fetchRequest.bind(this);
        this.toggleReset = this.toggleReset.bind(this);
        this.setCity = this.setCity.bind(this);
        // this.geoAddress = this.geoAddress.bind(this);
    }

    setCity(e) {
        this.setState({ 
            city: e.target.value
        })
    }

    toggleSubmit() {
        this.setState({
            submit: !this.state.submit,
        });
    };

    toggleSearch() {
        this.setState({
            search: !this.state.search,
        });
    };

    toggleReset() {
        this.setState({
            shows: []
        });
    };



    fetchRequest(body) {
        console.log('fetchRequest');
        fetch('/api/search', {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(shows => shows.json())
        .then(shows => {
            if (!shows.length) this.setState({
                shows: [{
                    performer: 'No matching results'
                }]
            })
            else {
                let validShows = [];
                let today = new Date();
                var yesterday= new Date(today);
                yesterday.setDate(today.getDate()-1);
                
                const origOrder = shows;

                // const sortedShows = shows.sort((a, b) => b.date - a.date);
                const sortedShows = shows.sort((a, b) => {
                    // console.log(a.date.slice(4));
                    return (a.date.slice(4) > b.date.slice(4)) ? 1 : -1
                })


                shows.forEach(show => {
                    let showDate = new Date(show.date);
                    if (showDate > yesterday) validShows.push(show);
                })
            this.setState({
                shows: validShows
            })
        }
        })
        .catch(err => console.log('THIS IS IN SEARCHPOPUP.JS : ERROR: ', err));
    }


    render() {
        const shows = [];

        if (this.state.shows.length === 1 && this.state.shows[0]['performer'] === 'No matching results') {
            shows.push(<h3 id='try-again' key={`no-results`}>Try again! No events found matching this search</h3>)
        }
            else {
            for (let i = 0; i < this.state.shows.length; i++) {
                shows.push(<ShowDisplay latitude={this.state.shows[i].latitude} longitude={this.state.shows[i].longitude} performer={this.state.shows[i].performer} venue={this.state.shows[i].venue} address={this.state.shows[i].address} date={this.state.shows[i].date} time={this.state.shows[i].time} cover={this.state.shows[i].cover}key={`show-${i}`}/>)
            }
        }

        return (
            <div>
            <div id='main-div'>
                <h3 id='small-banner'>Let us plan your night!</h3>
                <select id='select-city' value={this.state.city} onChange={this.setCity}>
            <option value='Select City'>Select City</option>
                            <option value='New York/Brooklyn'>New York/Brooklyn</option>
                            <option value='Los Angeles'>Los Angeles</option>
                            <option value='Miami'>Miami</option>
                            <option value='Chicago'>Chicago</option>
                        </select>
                <div className='buttons'>
                    <button onClick={this.toggleSearch} className='find-event'>Find Show</button>
                    <button onClick={this.toggleSubmit} className='submit-event'>Submit Show</button>
                </div>
                {this.state.submit ? <SubmitPopUp toggle={this.toggleSubmit} /> : null }
                {this.state.search ? <SearchPopUp currentCity={this.state.city} toggle={this.toggleSearch} fetchRequest={this.fetchRequest}/> : null }
                {this.state.shows.length ? <div><button className='reset' onClick={this.toggleReset}>Reset</button></div> : null}
                {shows}
                {/* {this.state.shows.length ? <div><button className='reset' onClick={this.toggleReset}>Reset</button></div> : null} */}
            </div>
            </div>
        );
    }
}

export default App;

