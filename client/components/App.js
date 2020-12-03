import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>The one stop shop for all the drag shows in your area</h2>
                <h5>Are you looking to submit a show or find one?</h5>
                <button className='find-event'>Find Show</button>
                <button className='submit-event'>Submit Show</button>
            </div>
        );
    }
}

export default App;