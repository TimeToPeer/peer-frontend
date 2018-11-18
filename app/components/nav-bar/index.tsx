import React, {Component} from 'react';
import Login from 'Components/login';

interface IMyState { loginClicked: boolean; }

class NavBar extends Component<{}, IMyState> {
	constructor(props: object) {
		super(props);
		this.state = {
			loginClicked: true,
		};

		this.openLoginModal = this.openLoginModal.bind(this);
	}

	openLoginModal(openModal: boolean) {
		this.setState({ loginClicked: openModal });
	}

	render() {
		const { loginClicked } = this.state;
		return(
			<div className='menu-container'>
				<div className='menu-container-flex'>
					<div className='logo-name'>PEER</div>
					<div className='signin' onClick={() => this.openLoginModal(true)}>SIGN IN</div>
				</div>
				<Login loginClicked={loginClicked} openLoginModal={this.openLoginModal} />
			</div>
		);
	}
}

export default NavBar;
