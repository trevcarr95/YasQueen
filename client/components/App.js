import React, { Component } from 'react';
import SubmitPopUp from './SubmitPopUp';
import SearchPopUp from './SearchPopUp';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
            search: false,
        };
        this.toggleSubmit = this.toggleSubmit.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
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
    
    render() {
        return (
            <div>
                <h3>Let us plan your night!</h3>
                {/* <form method='POST' action='/submit'>
                <button className='submit-event'>Submit Show</button>
                </form>
                <form method='POST' action='/search'>
                <button className='find-event'>Find Show</button>
                </form> */}
                <div onClick={this.toggleSubmit}>
                    <button className='submit-event'>Submit Show</button>
                </div>
                {this.state.submit ? <SubmitPopUp toggle={this.toggleSubmit} /> : null }
                {/* <form method='POST' action='/search'>
                <button className='find-event'>Find Show</button>
                </form> */}
                <div onClick={this.toggleSearch}>
                    <button className='find-event'>Find Show</button>
                </div>
                {this.state.search ? <SearchPopUp toggle={this.toggleSearch} /> : null }
            </div>
        );
    }
}

export default App;