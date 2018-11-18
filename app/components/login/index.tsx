import React, {Component, Fragment} from 'react';
import Modal from 'react-modal';

interface IMyState { modalIsOpen: boolean; }
interface IMyProps { loginClicked: boolean; openLoginModal(openModal: boolean): void; }

class Login extends Component<IMyProps, IMyState> {
	constructor(props: IMyProps) {
		super(props);
		this.state = {
			modalIsOpen: false,
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.props.openLoginModal(false);
	}

	render() {
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
					<input placeholder='firstname.lastname' />
					<input placeholder='minimum 6 characters' type='password'/>
					<button>SIGN ME UP</button>
					<svg preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' onClick={this.closeModal}>
						<path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
					</svg>

				</div>
			</Modal>
		);
	}
}

export default Login;