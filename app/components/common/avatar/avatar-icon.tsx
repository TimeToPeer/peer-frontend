import React, {Component} from 'react';
import {mapIdToColor} from 'Helpers/main-helper';
import MyPeers from 'Assets/images/people.svg';

interface IProps { profile: any; }

class AvatarIcon extends Component<IProps, {}> {
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
		const { name, icon } = this.props.profile;
		const color = mapIdToColor(Number(icon));
		const initials = this.getInitials(name);
		return(
			<div className='avatar'>
				<div className={`avatar-container ${color}`}>{initials}</div>
			</div>
		);
	}
}

export default AvatarIcon;
