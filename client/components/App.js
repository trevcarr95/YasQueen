import React, { Component } from 'react';
import SubmitPopUp from './SubmitPopUp';
import SearchPopUp from './SearchPopUp';
import ShowDisplay from './ShowDisplay';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
            search: false,
            // shows: [{
            //     performer: '',
            //     venue: '',
            //     address: '',
            //     date: '',
            //     time: '',
            //     cover: '',
            // }] 
            shows: []
        };
        this.toggleSubmit = this.toggleSubmit.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.fetchRequest = this.fetchRequest.bind(this);
        this.toggleReset = this.toggleReset.bind(this);
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
            // shows: [{
            //     performer: '',
            //     venue: '',
            //     address: '',
            //     date: '',
            //     time: '',
            //     cover: '',
            // }]
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
            this.setState({
                shows: shows
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
        // if (this.state.shows.length) {
            else {
            for (let i = 0; i < this.state.shows.length; i++) {
                shows.push(<ShowDisplay performer={this.state.shows[i].performer} venue={this.state.shows[i].venue} address={this.state.shows[i].address} date={this.state.shows[i].date} time={this.state.shows[i].time} cover={this.state.shows[i].cover}key={`show-${i}`}/>)
            }
        }
        // } else shows.push(<h1 key={`no results found`}>No events found</h1>)

        // if (this.state.shows) {this.state.shows.map((show, i) => shows.push(<ShowDisplay key={`show-${i}`} performer={this.state.shows[i].performer} venue={this.state.shows[i].venue} date={this.state.shows[i].date} time={this.state.shows[i].time} cover={this.state.shows[i].cover}/>))} 
        
        // if (Array.isArray(this.state.shows)) shows.push(<h1 key={`no-results`}>No results found</h1>)

        return (
            <div>
            <div id='main-div'>
                <h3 id='small-banner'>Let us plan your night!</h3>
                <div className='buttons'>
                    <button onClick={this.toggleSearch} className='find-event'>Find Show</button>
                    <button onClick={this.toggleSubmit} className='submit-event'>Submit Show</button>
                </div>
                {this.state.submit ? <SubmitPopUp toggle={this.toggleSubmit} /> : null }
                {this.state.search ? <SearchPopUp toggle={this.toggleSearch} fetchRequest={this.fetchRequest}/> : null }
                {this.state.shows.length ? <div><button className='reset' onClick={this.toggleReset}>Reset Results</button></div> : null}
                {shows}
            </div>
            {/* {shows} */}
            </div>
        );
    }
}

export default App;

// return (
//     <div>
//     <div id='main-div'>
//         <h3 id='small-banner'>Let us plan your night!</h3>
//         <div onClick={this.toggleSubmit}>
//             <button className='submit-event'>Submit Show</button>
//         </div>
//         {this.state.submit ? <SubmitPopUp toggle={this.toggleSubmit} /> : null }
//         <div onClick={this.toggleSearch}>
//             <button className='find-event'>Find Show</button>
//         </div>
//         {this.state.search ? <SearchPopUp toggle={this.toggleSearch} fetchRequest={this.fetchRequest}/> : null }
//         {this.state.shows.length ? <div><button className='reset' onClick={this.toggleReset}>Reset Results</button></div> : null}
//     </div>
//     {shows}
//     </div>
// );