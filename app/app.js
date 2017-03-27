import React from 'react';
import ReactDOM from 'react-dom';

// Each major browser view user interface must be imported.
import AccountOverview from './components/accountOverview.js';
import AccountSettings from './components/accountSettings.js';
import CreatePlaylist from './components/createPlaylist.js';
import MainDashboard from './components/mainDashboard.js';
import MainDashboardMusic from './components/mainDashboardMusic.js';
import Search_results from './components/searchResults.js';


// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
if (document.getElementById('accountOverview') !== null) {
  ReactDOM.render(
    <AccountOverview />,
    document.getElementById('accountOverview')
  );
} else if (document.getElementById('accountSettings') !== null) {
  ReactDOM.render(
    <AccountSettings />,
    document.getElementById('accountSettings')
  );
} else if (document.getElementById('added-friends-list') !== null) {
  ReactDOM.render(
    <CreatePlaylist />,
    document.getElementById('added-friends-list')
  );
} else if (document.getElementById('mainDashboard') !== null) {
  ReactDOM.render(
    <MainDashboard />,
    document.getElementById('mainDashboard')
  );
} else if (document.getElementById('mainDashboardMusic') !== null) {
  ReactDOM.render(
    <MainDashboardMusic />,
    document.getElementById('mainDashboardMusic')
  );
} else if (document.getElementById('searchResults') !== null) {
  ReactDOM.render(
    <Search_results />,
    document.getElementById('searchResults')
  );
}
