import React from 'react';
import Sidebar from './sidebar';
import AccountInfo from './accountInfo';

export default class mainbodyAccount extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
			<Sidebar />
			<AccountInfo />
		</div>
	</div>
    )
  }
}
