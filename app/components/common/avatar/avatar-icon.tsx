import React, {Component} from 'react';
import {mapIdToColor} from 'Helpers/main-helper';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {connect} from 'react-redux';
import { getUser } from 'Selectors/index';

const styles = () => ({
	'@keyframes glow': {
		'to': {
		  boxShadow: '0px 0px 30px 0px yellow',
		}
	},
	'avatar-icon': {
		fontFamily: 'JosefinRegular, Arial',
		height: '65px',
		width: '65px',
		cursor: 'pointer',
		fontSize: '20pt',
		color: 'black',
		
	},
	glow: {
		boxShadow: '0px 0px 50px -5px yellow',
		animation: 'glow 1.5s linear infinite alternate',
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

interface IProps { profile: any; classes: any; size?: string; first_name: string; last_name: string; icon: any; user: any; onClick?(bool: boolean):void; }

class AvatarIcon extends Component<IProps, {}> {
   	constructor(props: any) {
	   super(props);
	}

	shouldComponentUpdate(nextProps: any, nextState: any) {
		const { first_name, last_name, icon } = this.props.profile;
		if (nextProps.profile.first_name !== first_name ||
			nextProps.profile.last_name !== last_name ||
			nextProps.profile.icon !== icon) {
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
		const { first_name, last_name, icon, likes } = this.props.profile;
		const {  classes, size } = this.props;
		const color = mapIdToColor(Number(icon));
		const initials = this.getInitials(first_name, last_name);
		const glow = likes >= 3 ? 'glow' : '';
		return(
			<div className={classes['avatar-icon-container']} onClick={() => this.props.onClick(true)}>
				<Avatar className={classnames(classes['avatar-icon'], color, classes[size], classes[glow])}>
					<span>{initials}</span>
				</Avatar>
			</div>
		);
	}
}

const mapStateToProps = (store: any, props: any) => ({
	profile: getUser(store.usersReducer.users, props.id),
});

export default connect(mapStateToProps)(withStyles(styles)(AvatarIcon));
