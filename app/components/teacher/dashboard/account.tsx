import React, {Component} from 'react';
import AvatarIcon from 'Common/avatar/avatar-icon';
import AccountModal from 'Components/teacher/dashboard/account-modal';
import { getUser } from 'Actions/index';
import {connect} from 'react-redux';

interface IProps { profile: any; dispatch: any; }
interface IState { accountClicked: boolean; }

class Account extends Component<IProps, IState> {
   	constructor(props: any) {
	   	super(props);
		this.state = {
			accountClicked: false,
		};
		this.openAccount = this.openAccount.bind(this);
	}

	shouldComponentUpdate(nextProps: any, nextState: any) {
		if (nextProps.profile !== this.props.profile) {
			return true;
		} else if (this.state.accountClicked !== nextState.accountClicked) {
			return true;
		}

		return false;
	}

	openAccount(openAccount: boolean) {
		// open account modal
		this.setState({ accountClicked: openAccount });
		if (openAccount) {
			this.props.dispatch(getUser());
		}
	}

	getInitials(name: string) {
		const initials = name.match(/\b\w/g) || [];
		return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
	}

	checkIfProfileComplete(profile: any) {
		const { class_code, name, school_code } = profile;
		return class_code && name && school_code;
	}

	render() {
		const { accountClicked } = this.state;
		const { name, icon } = this.props.profile;
		const isProfileComplete = this.checkIfProfileComplete(this.props.profile);
		const profile = {
			name,
			icon,
		}
		return(
			<div className='avatar'>
				<AccountModal openAccount={this.openAccount} accountClicked={accountClicked} isProfileComplete={isProfileComplete} />
				<AvatarIcon profile={profile} size='large' onClick={() => this.openAccount(true)} />
			</div>
		);
	}
}

export default connect()(Account);
