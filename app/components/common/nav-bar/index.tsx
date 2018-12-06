import React, {Component} from 'react';
import Login from 'Common/nav-bar/login';
import {connect} from 'react-redux';
import {logoutUser} from 'Actions/index';

interface IMyState { loginClicked: boolean; signOut: boolean; accountClicked: boolean; }
interface IMyProps { loggedIn: boolean; history: any; dispatch: any; isProfileComplete: boolean; }

class NavBar extends Component<IMyProps, IMyState> {
	static getDerivedStateFromProps(props: any, state: any) {
		if (props.loggedIn && state.loginClicked) {
			return {loginClicked: false};
		}
		return null;
	}

	constructor(props: any) {
		super(props);
		this.state = {
			loginClicked: false,
			accountClicked: false,
			signOut: false,
		};

		this.openLoginModal = this.openLoginModal.bind(this);
		this.signOut = this.signOut.bind(this);
	}

	openLoginModal(openModal: boolean) {
		if (this.props.loggedIn) {
			this.signOut();
		} else {
			this.setState({ loginClicked: openModal });
		}
	}

	signOut() {
		this.props.dispatch(logoutUser());
		this.setState({ signOut: true });
	}

	render() {
		const { loginClicked } = this.state;
		const { loggedIn } = this.props;
		return(
			<div className='menu-container'>
				<div className='center-container'>
					<div className='logo-name' onClick={() => { window.location.href = '/'; } }>PEER</div>
					<div className='signin' onClick={() => this.openLoginModal(true)}>{loggedIn ? 'SIGN OUT' : 'SIGN IN' }</div>
					<Login loginClicked={loginClicked} openLoginModal={this.openLoginModal} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		loggedIn: state.authReducer.loggedIn,
	};
};

export default connect(mapStateToProps)(NavBar);
