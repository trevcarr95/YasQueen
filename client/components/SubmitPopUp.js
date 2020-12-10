import React, { Component } from "react";

class SubmitPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performer: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            cover: '',
            existsAlready: false
        }
        this.toggle=this.props.toggle;
        this.handlePerformerChange = this.handleChange.bind(this, 'performer');
        this.handleVenueChange = this.handleChange.bind(this, 'venue');
        this.handleAddressChange = this.handleChange.bind(this, 'address');
        this.handleDateChange = this.handleChange.bind(this, 'date');
        this.handleTimeChange = this.handleChange.bind(this, 'time');
        this.handleCoverChange = this.handleChange.bind(this, 'cover');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRetry = this.handleRetry.bind(this);
    }

    handleChange(keyName, e) {
        this.setState({[keyName]: e.target.value})
    }

    handleClose(e) {
        this.toggle();
    }

    handleRetry(e) {
        this.setState({
            existsAlready: false
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        // this.toggle();
        const body = {
            performer: this.state.performer,
            venue: this.state.venue,
            address: this.state.address,
            date: this.state.date,
            time: this.state.time,
            cover: this.state.cover
        };
        this.setState({
            performer: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            cover: '', 
        })
        fetch('/api/submit', {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(res => res.json())
          .then(data => {
            if (typeof data === 'string') {
                // console.log('THIS IS THE DATA IN SUBMITPOPUP.JS', data)
                this.setState({
                    existsAlready: true
                })
            }
            if (typeof data === 'object') { this.setState({
                existsAlready: false
            })
            this.toggle();
            }
          })
          .catch(err => console.log('THIS IS IN SUBMITPOPUP.JS : ERROR: ', err));
    }

    render() {
        return (
            <div className='submit-popup'>
                <div className='submit-popup-content'>
                    {/* <span id='submit-close' onClick={this.handleClose}>&times;</span> */}
                    <div className='container'>
                    <span id='submit-close' onClick={this.handleClose}>&times;</span>
                        {this.state.existsAlready ? <div><h3 id='submit-thanks'>Girl, you're late - someone already told us this!</h3><button id='send-info' onClick={this.handleRetry}>Submit Another Show</button></div> : <div><h3 id='submit-deetz'>Give Us The Deetz!</h3><label id='performer'>
                            Performer:
                            <input onChange={this.handlePerformerChange} type='text' value = {this.state.performer} />
                        </label>
                        <label id='venue'>
                            Venue:
                            <input onChange={this.handleVenueChange} type='text' value = {this.state.venue} />
                        </label>
                        <label id='address'>
                            Address:
                            <input onChange={this.handleAddressChange} type='text' value = {this.state.address} placeholder='Street Address, City, State, Zip' />
                        </label>
                        <label id='date'>
                            Date:
                            <input onChange={this.handleDateChange} type='text' value = {this.state.date} placeholder='MM/DD/YY' />
                        </label>
                        <label id='time'>
                            Time:
                            <input onChange={this.handleTimeChange} type='text' value = {this.state.time} placeholder='E.g.: 8PM'/>
                        </label>
                        <label id='cover'>
                            Cover:
                            <input onChange={this.handleCoverChange} type='text' placeholder = '$' value = {this.state.cover} />
                        </label>
                        <button id='send-info' onClick={this.handleSubmit}>Submit</button>
                        {/* {this.state.existsAlready ? <h3 id='submit-thanks'>Girl, you're late - someone already told us this!</h3> : <h3 id='submit-thanks'>Thank you for your submission!</h3>} */}
                        <h3 id='submit-thanks'>Thank you for your submission!</h3></div>}





                        {/* <label id='performer'>
                            Performer:
                            <input onChange={this.handlePerformerChange} type='text' value = {this.state.performer} />
                        </label>
                        <label id='venue'>
                            Venue:
                            <input onChange={this.handleVenueChange} type='text' value = {this.state.venue} />
                        </label>
                        <label id='address'>
                            Address:
                            <input onChange={this.handleAddressChange} type='text' value = {this.state.address} placeholder='Street Address, City, State, Zip' />
                        </label>
                        <label id='date'>
                            Date:
                            <input onChange={this.handleDateChange} type='text' value = {this.state.date} placeholder='MM/DD/YY' />
                        </label>
                        <label id='time'>
                            Time:
                            <input onChange={this.handleTimeChange} type='text' value = {this.state.time} placeholder='E.g.: 8PM'/>
                        </label>
                        <label id='cover'>
                            Cover:
                            <input onChange={this.handleCoverChange} type='text' placeholder = '$' value = {this.state.cover} />
                        </label> */}
                        <br />
                        {/* <button id='send-info' onClick={this.handleSubmit}>Submit</button> */}
                        {/* {this.state.existsAlready ? <h3 id='submit-thanks'>Girl, you're late - someone already told us this!</h3> : <h3 id='submit-thanks'>Thank you for your submission!</h3>} */}
                        {/* <h3 id='submit-thanks'>Thank you for your submission!</h3> */}
                    </div>
                </div>
            </div>
        )
    }
}


export default SubmitPopUp