import React, {Component} from 'react';
import {mapIdToColor} from 'Helpers/main-helper';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
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

	getInitials(first_name: string, last_name: string) {
		const first_initials = first_name.charAt(0).toUpperCase();
		const last_initials = last_name.charAt(0).toUpperCase();
		return first_initials + last_initials;
	}

	render() {
		const { first_name, last_name, icon } = this.props.profile;
		const {  classes, size } = this.props;
		const color = mapIdToColor(Number(icon));
		const initials = this.getInitials(first_name, last_name);
		return(
			<div className={classes['avatar-icon-container']} onClick={() => this.props.onClick(true)}>
				<Avatar className={classnames(classes['avatar-icon'], color, classes[size])}>
					<span>{initials}</span>
				</Avatar>
			</div>
		);
	}
}

export default withStyles(styles)(AvatarIcon);
