import React, {Component} from 'react';
import Login from 'Components/login';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {logoutUser} from 'Actions/index';

interface IMyState { loginClicked: boolean; signOut: boolean; }
interface IMyProps { loggedIn: boolean; history: any; dispatch: any; }

class NavBar extends Component<IMyProps, IMyState> {
	constructor(props: any) {
		super(props);
		this.state = {
			loginClicked: false,
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
		localStorage.removeItem('key');
		this.props.dispatch(logoutUser());
		this.setState({ signOut: true });
	}

	render() {
		const { loginClicked, signOut } = this.state;
		const { loggedIn } = this.props;
		if (signOut) {
			return (
				<Redirect to='/' />
			);
		}

		return(
			<div className='menu-container'>
				<div className='menu-container-flex'>
					<div className='logo-name'>PEER</div>
					<div className='signin' onClick={() => this.openLoginModal(true)}>{loggedIn ? 'SIGN OUT' : 'SIGN IN' }</div>
				</div>
				<Login loginClicked={loginClicked} openLoginModal={this.openLoginModal} loggedIn={loggedIn} />
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
