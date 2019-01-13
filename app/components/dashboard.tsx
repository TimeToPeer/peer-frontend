import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, showLoading, fetchUsers} from 'Actions/index';
import StudentDashboard from 'Components/student/dashboard';
import TeacherDashboard from 'Components/teacher/dashboard';

interface IState { loggedIn: boolean; }
interface IProps { profile: any; dispatch: any; usersPending: boolean; }

class Dashboard extends Component<IProps, IState> {
	static getDerivedStateFromProps(props: any, state: any) {
		if (props.loggedIn && !state.loggedIn) {
			props.dispatch(getUser());
			props.dispatch(fetchUsers());
			return {loggedIn: true};
		} else if(!props.profile.pending && !props.usersPending) {
			props.dispatch(showLoading(false));
		}
		return null;
	}
	
	constructor(props: any) {
		super (props);
		this.state = {
			loggedIn: false,
		}
	}

	componentDidMount() {
		this.props.dispatch(showLoading(true));
	}

	render() {
		const { pending, type } = this.props.profile;
		const { profile, usersPending } = this.props;
		if (pending || usersPending) {
			return(
				<div></div>
			)
		} else if (type === 1) {
			return <TeacherDashboard profile={profile} />;
		}
		else return <StudentDashboard profile={profile} />;
	}
}

const mapStateToProps = (state: any) => {
	return{
		profile: state.profileReducer,
		loggedIn: state.authReducer.loggedIn,
		usersPending: state.usersReducer.pending,
	}
}

export default connect(mapStateToProps)(Dashboard);
