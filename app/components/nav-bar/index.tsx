import React, {Component} from 'react';
import Login from 'Components/login';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {logoutUser, getUser} from 'Actions/index';
import landingImg from 'Assets/images/profile.svg';
import Account from 'Components/nav-bar/account';

interface IMyState { loginClicked: boolean; signOut: boolean; accountClicked: boolean; }
interface IMyProps { loggedIn: boolean; history: any; dispatch: any; isProfileComplete: boolean; }

class NavBar extends Component<IMyProps, IMyState> {
	constructor(props: any) {
		super(props);
		this.state = {
			loginClicked: false,
			accountClicked: false,
			signOut: false,
		};

		this.openLoginModal = this.openLoginModal.bind(this);
		this.signOut = this.signOut.bind(this);
		this.openAccount = this.openAccount.bind(this);
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

	openAccount(openAccount: boolean) {
		// open account modal
		this.setState({ accountClicked: openAccount });
		if (openAccount) {
			this.props.dispatch(getUser());
		}
	}

	render() {
		const { loginClicked, accountClicked, signOut } = this.state;
		const { loggedIn } = this.props;
		return(
			<div className='menu-container'>
				<div className='logo-name' onClick={() => { window.location.href = '/'; } }>PEER</div>
				{loggedIn ? <img className='profile-icon' src={landingImg} onClick={() => this.openAccount(true)} /> : null }
				<div className='signin' onClick={() => this.openLoginModal(true)}>{loggedIn ? 'SIGN OUT' : 'SIGN IN' }</div>
				<Login loginClicked={loginClicked} openLoginModal={this.openLoginModal} />
				<Account openAccount={this.openAccount} accountClicked={accountClicked} isProfileComplete={this.props.isProfileComplete} />
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
