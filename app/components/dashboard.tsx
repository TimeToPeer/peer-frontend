import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, showLoading} from 'Actions/index';
import StudentDashboard from 'Components/student/dashboard';
import TeacherDashboard from 'Components/teacher/dashboard';

interface IState { loggedIn: boolean; }
interface IProps { profile: any; dispatch: any; }

class Dashboard extends Component<IProps, IState> {
	static getDerivedStateFromProps(props: any, state: any) {
		if (props.loggedIn && !state.loggedIn) {
			props.dispatch(getUser());
			return {loggedIn: true};
		} else if(!props.profile.pending) {
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
		const { profile } = this.props;
		if (pending) {
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
	}
}

export default connect(mapStateToProps)(Dashboard);
