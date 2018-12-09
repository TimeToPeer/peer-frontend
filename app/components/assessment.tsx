import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, showLoading, selectedQuestEntry, getQuestEntry} from 'Actions/index';
import StudentAssessment from 'Components/student/assessment';
import TeacherAssessment from 'Components/teacher/assessment';

interface IState { loggedIn: boolean;  entryId: string;  }
interface IProps { profile: any; dispatch: any;  match: any; }

class Assessment extends Component<IProps, IState> {
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
        const entryId = this.props.match.params.id;
		this.state = {
            entryId,
			loggedIn: false,
		}
	}

	componentDidMount() {
        const {entryId} = this.state;
        this.props.dispatch(showLoading(true));
        if (this.state.entryId) {
            this.props.dispatch(selectedQuestEntry(entryId));
            this.props.dispatch(getQuestEntry({entryId}));
        }
	}

	render() {
		const { pending, type } = this.props.profile;
		if (pending) {
			return(
				<div></div>
			)
		} else if (type === 1) {
			return <TeacherAssessment entryId={this.state.entryId} />;
		}
		else return <StudentAssessment entryId={this.state.entryId} />;
	}
}

const mapStateToProps = (state: any) => {
	return{
		profile: state.profileReducer,
		loggedIn: state.authReducer.loggedIn,
	}
}

export default connect(mapStateToProps)(Assessment);
