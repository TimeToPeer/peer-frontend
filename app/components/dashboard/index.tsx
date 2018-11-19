import React, {Component} from 'react';
import NavBar from 'Components/nav-bar';

class Dashboard extends Component<{}, {}> {
	constructor(props: object) {
		super(props);
	}
	render() {
		return(
			<div className='dashboard-container'>
				<NavBar />
				<div className='dashboard'>
					hello world
				</div>
			</div>
		);
	}
}

export default Dashboard;
