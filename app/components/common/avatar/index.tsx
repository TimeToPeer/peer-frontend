import React, {Component} from 'react';
import {mapIdToColor} from 'Helpers/main-helper';
import MyPeers from 'Assets/images/people.svg';
import AvatarIcon from 'Common/avatar/avatar-icon';

interface IProps { profile: any; openAccount(open: boolean): void; }

class Avatar extends Component<IProps, {}> {
   	constructor(props: any) {
	   super(props);
	}

	shouldComponentUpdate(nextProps: any, nextState: any) {
		if (nextProps.profile !== this.props.profile) {
			return true;
		}

		return false;
	}

	getInitials(name: string) {
		const initials = name.match(/\b\w/g) || [];
		return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
	}

	render() {
		const { first_name, last_name, icon, personality } = this.props.profile;
		const profile = {
			first_name,
			last_name,
			icon,
		}
		return(
			<div className='avatar'>
				<AvatarIcon profile={profile} size='large' onClick={() => this.props.openAccount(true)} />
				<div className='user-name'>{first_name.toUpperCase()} {last_name.toUpperCase()}</div>
				<div className='personality'>{personality}</div>
				<div className='my-peers'>
					<img src={MyPeers} />
					<div>89 Peers</div>
				</div>
			</div>
		);
	}
}

export default Avatar;
