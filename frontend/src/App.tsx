import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

  render() {
    async function callExpress() {
      try {
        let response = await fetch('/api').then(res => res.json());
        console.log('Response from the backend: ' + response.message);
      } catch (err) {
        console.error(err)
      }
    }

    callExpress();
    return (
      <h1>Hello World</h1>
    )
  }
}
