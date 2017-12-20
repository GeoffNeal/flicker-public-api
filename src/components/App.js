import React, { Component } from 'react';

// Styles
import '../styles/index.css';
import styles from '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.heading}>Flickr public API</h1>
      </div>
    );
  }
}

export default App;
