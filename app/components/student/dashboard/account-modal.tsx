import React, {Component, Fragment} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {saveUser} from 'Actions/index';
import closeIcon from 'Assets/images/close.svg';
import AccountInput from 'Components/common/inputs/account-input';
import ColorPicker from 'Common/color-selector';

interface IMyState { modalIsOpen: boolean; valid: boolean; first_name: string; last_name: string;
	class_code: string; school_code: string; profile: any; personality: string; saved: boolean; icon: number; }
interface IMyProps { dispatch: any; accountClicked: boolean; isProfileComplete: boolean; profile: any; openAccount(openAccount: boolean): void; }

class AccountModal extends Component<IMyProps, IMyState> {
	static getDerivedStateFromProps(props: any, state: any) {
		if (props.profile !== state.profile) {
			return {
				profile: props.profile,
				first_name: props.profile.first_name || '',
				last_name: props.profile.last_name || '',
				class_code: props.profile.class_code || '',
				school_code: props.profile.school_code || '',
				personality: props.profile.personality || '',
				icon: Number(props.profile.icon),
			};
		} else if (props.saved !== state.saved) {
			return {
				saved: props.saved,
				modalIsOpen: !props.saved,
			};
		}
		return null;
	}

	constructor(props: IMyProps) {
		super(props);
		this.state = {
			modalIsOpen: false,
			valid: true,
			profile: {},
			first_name: '',
			last_name: '',
			class_code: '',
			school_code: '',
			personality: '',
			saved: false,
			icon: 0,
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitChange = this.submitChange.bind(this);
		this.onChangeFName = this.onChangeFName.bind(this);
		this.onChangeLName = this.onChangeLName.bind(this);
		this.onChangeClassCode = this.onChangeClassCode.bind(this);
		this.onChangeSchool = this.onChangeSchool.bind(this);
		this.onChangePersonality = this.onChangePersonality.bind(this);
		this.onChangeIcon = this.onChangeIcon.bind(this);
	}
	componentDidUpdate() {
		if (this.props.profile.saved) {
			this.closeModal();
		}
	}
	openModal() {
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.props.openAccount(false);
	}

	submitChange() {
		// save changes
		const { id } = this.props.profile;
		const { first_name, last_name, class_code, school_code, personality, icon } = this.state;
		this.props.dispatch(saveUser({ first_name, last_name, class_code, school_code, personality, icon, id }));
		this.closeModal();
		if (this.props.profile.class_code !== class_code) {
			location.reload();
		}
	}

	onChangeFName(val: string) {
		this.setState({ first_name: val });
	}

	onChangeLName(val: string) {
		this.setState({ last_name: val });
	}


	onChangeClassCode(val: string) {
		this.setState({ class_code: val });
	}

	onChangeSchool(val: string) {
		this.setState({ school_code: val });
	}

	onChangePersonality(val: string) {
		this.setState({ personality: val });
	}

	onChangeIcon(icon: number) {
		this.setState({icon});
	}

	render() {
		const { pending, first_name, last_name, class_code, personality } = this.props.profile;
		if (pending) {
			return (
				<div></div>
			);
		}

		const isOpen = !this.props.isProfileComplete ? true : this.props.accountClicked;

		return (
			<Modal
				className='student-account-modal'
				isOpen={isOpen}
				onRequestClose={this.closeModal}
				ariaHideApp={false}
				contentLabel='Account Modal'
			>
				<div className='account-container'>
					<div className='close-btn' onClick={this.closeModal}>
						<img src={closeIcon} />
					</div>
					<div className='account-heading'>ABOUT ME</div>
					<div className='row'>
						<AccountInput value={first_name} onChange={this.onChangeFName} placeholder='FIRST NAME' length={100} />
						<AccountInput value={last_name} onChange={this.onChangeLName} placeholder='LAST NAME' length={100}/>
					</div>
					<div className='row'>
						<AccountInput value={class_code} onChange={this.onChangeClassCode} placeholder='CLASS CODE' length={30}/>
						<ColorPicker userColor={this.state.icon} onChangeIcon={this.onChangeIcon} />
					</div>
					<div className='wide-row'>
						<AccountInput value={personality} onChange={this.onChangePersonality} placeholder='ADD PERSONALITY (School President, Book Worm, Soccer Star, or Class Comedian?)' length={64}/>
					</div>
					<button onClick={this.submitChange}>SAVE</button>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		profile: state.profileReducer,
	};
};

export default connect(mapStateToProps)(AccountModal);
