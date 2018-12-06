import React, {Component} from 'react';
import {mapIdToColor} from 'Helpers/main-helper';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/Styles';
import classnames from 'classnames';

const styles = () => ({
	'avatar-icon': {
		fontFamily: 'JosefinRegular, Arial',
		height: '65px',
		width: '65px',
		cursor: 'pointer',
		fontSize: '20pt',
		color: 'black',
	},
	'avatar-icon-container': {
		display: 'inline-block',
		verticalAlign: 'top',
	},
	'small': {
		width: '50px',
		height: '50px',
		fontSize: '12pt',
	},
	'medium': {
		width: '65px',
		height: '65px',
	},
	'large': {
		width: '200px',
		height: '200px',
		fontSize: '60pt',
	},
});

interface IProps { profile: any; classes: any; size?: string; onClick?(bool: boolean):void; }

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
		const {  classes, size } = this.props;
		const color = mapIdToColor(Number(icon));
		const initials = this.getInitials(name);
		return(
			<div className={classes['avatar-icon-container']} onClick={() => this.props.onClick(true)}>
				<Avatar aria-label='Avatar' className={classnames(classes['avatar-icon'], color, classes[size])}>
					{initials}
				</Avatar>
			</div>
		);
	}
}

export default withStyles(styles)(AvatarIcon);
