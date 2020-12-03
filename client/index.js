import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import styles from './css/application.css';

// ReactDOM.render(<h1>Hello Queens!</h1>,document.getElementById('root'));
render(
    <App />,
    document.getElementById('root')
  );