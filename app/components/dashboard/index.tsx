import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavBar from 'Components/nav-bar';
import Avatar from 'Common/avatar';
import NewQuest from 'Common/new-quest';
import Menu from 'Components/dashboard/menu';
import Feed from 'Components/dashboard/feed';
import { getUser, getQuests, getPeerQuests} from 'Actions/index';

interface IState { isLoading: boolean; }
interface IProps { profile: any; dispatch: any; quests: any; entries: any; }

class Dashboard extends Component<IProps, IState> {
	static getDerivedStateFromProps(props: any, state: any) {
		if (props.profile.pending === false && state.isLoading) {
			return { isLoading: false };
		}
		return null;
	}

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		this.props.dispatch(getUser());
		this.props.dispatch(getQuests({}));
		// get quests for class
		this.props.dispatch(getPeerQuests({}));
	}

	checkIfProfileComplete(profile: any) {
		const { class_code, name, school_code } = profile;
		return class_code && name && school_code;
	}

	getInveotryComponents(data: any) {
		const newQuests = [];
		let i = 0;
		for (const item in data) {
			if (!data.hasOwnProperty(item)) {
				continue;
			}
			newQuests.push(<NewQuest key={i} id={data[item].id} title={data[item].title} />);
			i++;
		}
		return newQuests;
	}

	render() {
		if (this.state.isLoading || this.props.quests.pending || this.props.entries.pending) {
			return (
				<div></div>
			);
		}
		const { quests } = this.props;
		const inventory = this.getInveotryComponents(quests.inventory);
		const isProfileComplete = this.checkIfProfileComplete(this.props.profile);
		return(
			<div className='dashboard-container'>
				<NavBar isProfileComplete={isProfileComplete} />
				{!isProfileComplete ? null :
					<div className='dashboard'>
						<div className='hotspot'>
							<Avatar profile={this.props.profile} />
							{inventory}
						</div>
						<div className='infotainment'>
							<Menu />
							<Feed entries={this.props.entries} />
						</div>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		profile: state.profileReducer,
		quests: state.questsReducer,
		entries: state.entryReducer,
	};
};

export default connect(mapStateToProps)(Dashboard);
