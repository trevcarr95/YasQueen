import React, { Component } from "react";
import Dropdown from 'react-overlays/Dropdown';

class SearchPopUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            criteria: 'performer',
            value: ''
        }
        this.toggle=this.props.toggle;
        this.handleClose = this.handleClose.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

    handleValueChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleCityChange(e) {
        this.setState({
            city: e.target.value
        })
    }

    handleCriteriaChange(e) {
        this.setState({
            criteria: e.target.value
        })
    }

    handleClose(e) {
        this.toggle();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.toggle();
        const body = {
            city: this.state.city,
            criteria: this.state.criteria,
            value: this.state.value
        };
        this.setState({
            city: '',
            criteria: 'performer',
            value: ''
        });
        // fetch('/api/search')
        fetch('/api/search', {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(shows => {
            console.log(shows);
        })
        .catch(err => console.log('THIS IS IN SEARCHPOPUP.JS : ERROR: ', err));
    }

    render() {
        return (
            <div className='search-popup'>
                <div className='search-popup-content'>
                    <div className='search-container'>
                    <span id='search-close' onClick={this.handleClose}>&times;</span>
                        <h3 id='deetz'>Search for events in: </h3>
                        <label id='search-city'>
                            <input onChange={this.handleCityChange} value = {this.state.city} type='text' placeholder='Enter city'/>
                        </label>
                        <h4>Refine your search</h4>
                        <select id='select-criteria' value={this.state.criteria} onChange={this.handleCriteriaChange}>
                            <option value='performer'>Performer</option>
                            <option value='venue'>Venue</option>
                            <option value='date'>Date</option>
                            <option value='cost'>Cost</option>
                        </select>
                        <label id='search-field'>
                            {this.state.criteria === 'date' ? <input type='text' placeholder='MM/DD/YY' onChange={this.handleValueChange} value = {this.state.value}/> : null}
                            {this.state.criteria === 'cost' ? <input type='text' placeholder='$' onChange={this.handleValueChange} value = {this.state.value}/> : null}
                            {this.state.criteria === 'performer' ? <input type='text' placeholder='Enter name' onChange={this.handleValueChange} value = {this.state.value}/> : null}
                            {this.state.criteria === 'venue' ? <input type='text' placeholder='Enter venue' onChange={this.handleValueChange} value = {this.state.value}/> : null}
                        </label>
                        <button id='search-button' onClick={this.handleSubmit}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPopUp

 // fetch('/api/search', {
        //     method: 'GET',
        //     headers: {
        //       "Content-Type": 'application/json',
        //       'Accept': 'application/json'
        //     },
        //     body: JSON.stringify(body)
        //   })
        //   .then(resp => resp.json())
        //   .then(data => {
        //     console.log('THIS IS THE DATA IN SEARCH.JS', data);
        //   })
        //   .catch(err => console.log('THIS IS IN SEARCHPOPUP.JS : ERROR: ', err));