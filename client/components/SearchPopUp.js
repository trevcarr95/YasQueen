import React, { Component } from "react";


class SearchPopUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        console.log(this.props);
        this.toggle();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.toggle();
        const body = {
            city: this.props.currentCity,
            criteria: this.state.criteria,
            value: this.state.value
        };
        this.setState({
            city: '',
            criteria: 'performer',
            value: ''
        });
        this.props.fetchRequest(body);
    }

    render() {
        return (
            <div className='search-popup'>
                <div className='search-popup-content'>
                    <div className='search-container'>
                    <span id='search-close' onClick={this.handleClose}>&times;</span>
                        {this.props.currentCity === 'Select City' || this.props.currentCity === ''  ? <h3 id='search-deetz'>Please Select A City</h3> : <div><h1 id='shows-in'>Shows in {this.props.currentCity} 
                        </h1>{this.state.criteria === 'date' ?  <h4 id='refine'>on: </h4>: null}
                            {this.state.criteria === 'cost' ? <h4 id='refine'>that cost less than: </h4> : null}
                            {this.state.criteria === 'performer' ? <h4 id='refine'>featuring: </h4> : null}
                            {this.state.criteria === 'venue' ? <h4 id='refine'>at: </h4> : null}
                        <select id='select-criteria' value={this.state.criteria} onChange={this.handleCriteriaChange}>
                            <option value='performer'>Performer</option>
                            <option value='venue'>Venue</option>
                            <option value='date'>Date</option>
                            <option value='cost'>Cost</option>
                        </select>
                        <label id='search-field'>
                            {this.state.criteria === 'date' ? <input type='text' placeholder='MM/DD/YYYY' onChange={this.handleValueChange} value = {this.state.value}/> : null}
                            {this.state.criteria === 'cost' ? <input type='text' placeholder='$' onChange={this.handleValueChange} value = {this.state.value}/> : null}
                            {this.state.criteria === 'performer' ? <input type='text' placeholder='Enter name' onChange={this.handleValueChange} value = {this.state.value}/> : null}
                            {this.state.criteria === 'venue' ? <input type='text' placeholder='Enter venue' onChange={this.handleValueChange} value = {this.state.value}/> : null}
                        </label>
                        <button id='search-button' onClick={this.handleSubmit}>Search</button> </div>}
                        {/* <h3 id='search-deetz'>Search for events in {this.props.currentCity} </h3> */}
                        {/* <label id='search-city'>
                            <input onChange={this.handleCityChange} value = {this.state.city} type='text' placeholder='Enter city'/>
                        </label> */}
                            {/* {this.state.criteria === 'date' ?  <h4 id='refine'>on: </h4>: null}
                            {this.state.criteria === 'cost' ? <h4 id='refine'>that cost less than: </h4> : null}
                            {this.state.criteria === 'performer' ? <h4 id='refine'>featuring: </h4> : null}
                            {this.state.criteria === 'venue' ? <h4 id='refine'>at: </h4> : null}
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
                        <button id='search-button' onClick={this.handleSubmit}>Search</button> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPopUp
