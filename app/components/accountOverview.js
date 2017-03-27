import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBodyAccount from './mainDashboard/mainBodyAccount';

export default class accountOverview extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <MainBodyAccount />
      </div>
    )
  }
}
