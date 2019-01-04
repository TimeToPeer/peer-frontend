import React, {Component} from 'react';
import MyPeers from 'Assets/images/people.svg';
import AvatarIcon from 'Common/avatar/avatar-icon';
import AccountModal from 'Components/student/dashboard/account-modal';
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

	checkIfProfileComplete(profile: any) {
		const { class_code, first_name, last_name } = profile;
		return class_code && first_name && last_name;
	}

	render() {
		const { accountClicked } = this.state;
		const { first_name, last_name, icon, personality } = this.props.profile;
		const isProfileComplete = this.checkIfProfileComplete(this.props.profile);
		const profile = {
			first_name,
			last_name,
			icon,
		}
		return(
			<div className='avatar'>
				<AccountModal openAccount={this.openAccount} accountClicked={accountClicked} isProfileComplete={isProfileComplete} />
				{!isProfileComplete ? null :
					<div>
						<AvatarIcon profile={profile} size='large' onClick={() => this.openAccount(true)} />
						<div className='user-name'>{first_name.toUpperCase()} {last_name.toUpperCase()}</div>
						<div className='personality'>{personality}</div>
						<div className='my-peers'>
							<img src={MyPeers} />
							<div>89 Peers</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default connect()(Account);
