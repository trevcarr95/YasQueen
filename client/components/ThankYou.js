import React, { Component } from "react";

class ThankYou extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showThankYou: false
        }
        this.toggle=this.props.toggle;
        this.handleClose = this.handleClose.bind(this);
        }

    handleClose(e) {
        this.toggle()
        this.setState({
            showThankYou: true
        })
    }

    render() {
        return (
            <div className='thanks-popup'>
                <div className='thanks-popup-content'>
                    {/* <span className='close' onClick={this.handleClose}>&times;</span> */}
                    {/* <form className='close' onClick={this.handleClick}>&times;</form> */}
                    <div className='thanks-container'>
                        <h3 id='deetz'>Thank you for your submission!</h3>
                        <button id='thank-button' onClick={this.handleClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ThankYou