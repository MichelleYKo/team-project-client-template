import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBanner from './components/errorbanner'

// Each major browser view user interface must be imported.
import AccountOverview from './components/accountOverview.js';
import EditProfile from './components/editProfile.js';
import MainDashboardMusic from './components/mainDashboardMusic.js';


// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
if (document.getElementById('accountOverview') !== null) {
  ReactDOM.render(
    <AccountOverview />,
    document.getElementById('accountOverview')
  );
} else if (document.getElementById('editProfile') !== null) {
  ReactDOM.render(
    <EditProfile />,
    document.getElementById('editProfile')
  );
} else if (document.getElementById('mainDashboardMusic') !== null) {
  ReactDOM.render(
    <MainDashboardMusic />,
    document.getElementById('mainDashboardMusic')
  );
}
