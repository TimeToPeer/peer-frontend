import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import Menu from 'Components/student/dashboard/menu';
import Feed from 'Common/feed';
import { getQuests, getPeerQuests, showLoading} from 'Actions/index';
import Account from 'Components/teacher/dashboard/account';
import Quests from 'Components/teacher/dashboard/quests';
import Classroom from 'Components/teacher/dashboard/classroom';
import MyPeers from 'Assets/images/people.svg';
import TelephoneSvg from 'Assets/images/telephone.svg';

interface IState { isLoading: boolean; currentMenuItem: string; }
interface IProps { profile: any; dispatch: any; quests: any; entries: any; comments: any; }

class Dashboard extends Component<IProps, IState> {
	static getDerivedStateFromProps(props: any, state: any) {
		if (state.isLoading && !props.entries.pending) {
			props.dispatch(showLoading(false));
			return { isLoading: false };
		}
		return {};
	}

	private myRef: any;

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			currentMenuItem: 'quest-spanmenuitem',
		};

		this.myRef = createRef<HTMLDivElement>();

		this.renderInfo = this.renderInfo.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	shouldComponentUpdate(nextProps: any, nextState: any) {
		if (nextState.currentMenuItem !== this.state.currentMenuItem ||
			nextState.isLoading !== this.state.isLoading ||
			nextProps.quests !== this.props.quests ||
			nextProps.comments !== this.props.comments ||
			nextProps.entries !== this.props.entries ||
			nextProps.profile !== this.props.profile) {
			return true;
		}
		return false;
	}

	componentDidMount() {
		this.props.dispatch(showLoading(true));
		this.props.dispatch(getQuests({}));
		// get quests for class
		this.props.dispatch(getPeerQuests({}));
	}

	checkIfProfileComplete(profile: any) {
		const { class_code, name, school_code } = profile;
		return class_code && name && school_code;
	}

	handleMenuClick(id: string) {
		this.setState({currentMenuItem: id});
	}

	renderInfo() {
		const {currentMenuItem} = this.state;

		if (currentMenuItem === 'quest-spanmenuitem') {
			return <Quests entries={this.props.entries} inventory={this.props.quests.inventory} />;
		} else if (currentMenuItem === 'skills-spanmenuitem') {
			window.location.href = '/assessment';
		} else {
			return <Feed entries={this.props.entries} {...this.props.comments} disableComment={true} />;
		}
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div></div>
			);
		}
		const { profile } = this.props;
		const isProfileComplete = this.checkIfProfileComplete(this.props.profile);
		return(
			<div className='teacher-dashboard-container'>
				{!isProfileComplete ? null :
					<div className='dashboard'>
						<div className='hotspot'>
							<Account profile={this.props.profile}  />
                            <div className='teacher-info'>
                                <div className='user-name'>{profile.name.toUpperCase()}</div>
                                <div className='grade'>GRADE</div>
                                <div className='student-number'>Number of Students</div>
                            </div>
                            <div className='my-peers'>
								<div className='school'>
									<img src={TelephoneSvg} />
									<span>School + Location</span>
								</div>
                               
                                <div className='peers'>
									<img src={MyPeers} />
									<span>100 Peers</span>
								</div>
                            </div>
						</div>
						<div className='infotainment'>
							<Menu handleMenuClick={this.handleMenuClick} isTeacher={true} current='quest-spanmenuitem' />
							{this.renderInfo()}
						</div>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		quests: state.questsReducer,
		entries: state.entryReducer,
		comments: state.commentsReducer,
	};
};

export default connect(mapStateToProps)(Dashboard);
