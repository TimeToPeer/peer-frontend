import React, {Component, Fragment} from 'react';
import Modal from 'react-modal';
import {authUser} from 'Actions/index';
import { connect } from 'react-redux';

interface IMyState { modalIsOpen: boolean; userName: string; password: string; valid: boolean; }
interface IMyProps { dispatch: any; loginClicked: boolean; openLoginModal(openModal: boolean): void; }

class Login extends Component<IMyProps, IMyState> {
	constructor(props: IMyProps) {
		super(props);
		this.state = {
			modalIsOpen: false,
			userName: '',
			password: '',
			valid: true,
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.requestLogin = this.requestLogin.bind(this);
	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.props.openLoginModal(false);
	}

	onChangeFirstName(event: React.FormEvent<HTMLInputElement>) {
		this.setState({ userName: event.currentTarget.value });
	}

	onChangePassword(event: React.FormEvent<HTMLInputElement>) {
		this.setState({ password: event.currentTarget.value });
	}

	submitLogin() {
		const { userName, password } = this.state;

		if (userName.length < 1 || password.length < 6) {
			this.setState({ valid: false });
		} else {
			this.setState({ valid: true });
			this.requestLogin();
		}
	}

	requestLogin() {
		const { userName, password } = this.state;

		this.props.dispatch(authUser({userName, password}));
	}

	render() {
		const { userName, password, valid } = this.state;
		return (
			<Modal
				className='login-modal'
				isOpen={this.props.loginClicked}
				onRequestClose={this.closeModal}
				ariaHideApp={false}
				contentLabel='Example Modal'
			>
				<div className='login-container'>
					<div className='login-heading'>TIME TO PEER</div>
					<div className='login-subheading'>Join the arena of curiosity, collaboration and creativity.</div>
					<input placeholder='firstname.lastname' onChange={this.onChangeFirstName} value={userName} />
					<input placeholder='minimum 6 characters' type='password' onChange={this.onChangePassword} value={password} />
					{ !valid ? <div className='errorMsg'>error</div>  : null }
					<button onClick={this.submitLogin}>SIGN ME UP</button>
					<svg preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' onClick={this.closeModal}>
						<path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
					</svg>

				</div>
			</Modal>
		);
	}
}

export default connect()(Login);
