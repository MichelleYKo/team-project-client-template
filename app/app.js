import React from 'react';
import ReactDOM from 'react-dom';

// Each major browser view user interface must be imported.
import accountOverview from './components/accountOverview.js';
import accountSettings from './components/accountSettings.js';
import createPlaylist from './components/createPlaylist.js';
import mainDashboard from './components/mainDashboard.js';
import mainDashboardMusic from './components/mainDashboardMusic.js';
import search_results from './components/search_results.js';


// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
if (document.getElementById('accountOverview') !== null) {
  ReactDOM.render(
    <accountOverview />,
    document.getElementById('accountOverview')
  );
} else if (document.getElementById('accountSettings') !== null) {
  ReactDOM.render(
    <accountSettings />,
    document.getElementById('accountSettings')
  );
} else if (document.getElementById('createPlaylist') !== null) {
  ReactDOM.render(
    <createPlaylist />,
    document.getElementById('mainDashboard')
  );
} else if (document.getElementById('mainDashboard') !== null) {
  ReactDOM.render(
    <mainDashboard />,
    document.getElementById('mainDashboardMusic')
  );
} else if (document.getElementById('mainDashboardMusic') !== null) {
  ReactDOM.render(
    <mainDashboardMusic />,
    document.getElementById('mainDashboardMusic')
  );
} else if (document.getElementById('search_results') !== null) {
  ReactDOM.render(
    <search_results />,
    document.getElementById('search_results')
  );
}