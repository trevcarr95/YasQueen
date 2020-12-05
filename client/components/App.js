import React, { Component } from 'react';
import PopUp from './PopUp';
import ThankYou from './ThankYou';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seen: false,
        };
        this.togglePop = this.togglePop.bind(this);
    }

    togglePop() {
        this.setState({
            seen: !this.state.seen,
        });
    };
    
    render() {
        return (
            <div>
                <h3>Do you want to submit a show or find one?</h3>
                {/* <form method='POST' action='/submit'>
                <button className='submit-event'>Submit Show</button>
                </form>
                <form method='POST' action='/search'>
                <button className='find-event'>Find Show</button>
                </form> */}
                <div onClick={this.togglePop}>
                    <button className='submit-event'>Submit Show</button>
                </div>
                {this.state.seen ? <PopUp toggle={this.togglePop} /> : null }
                <form method='POST' action='/search'>
                <button className='find-event'>Find Show</button>
                </form>
            </div>
        );
    }
}

export default App;