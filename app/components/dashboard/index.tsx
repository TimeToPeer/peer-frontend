import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import Avatar from 'Common/avatar';
import NewQuest from 'Common/new-quest';
import Menu from 'Components/dashboard/menu';
import Feed from 'Components/dashboard/feed';
import { getUser, getQuests, getPeerQuests, showLoading} from 'Actions/index';
import Account from 'Components/dashboard/account';
import Quests from 'Components/dashboard/quests';

interface IState { isLoading: boolean; loginClicked: boolean; signOut: boolean; accountClicked: boolean; currentMenuItem: string; }
interface IProps { profile: any; dispatch: any; quests: any; entries: any; comments: any; }

class Dashboard extends Component<IProps, IState> {
	static getDerivedStateFromProps(props: any, state: any) {
		if (!props.profile.pending && state.isLoading && !props.entries.pending) {
			props.dispatch(showLoading(false));
			return { isLoading: false };
		}
		return null;
	}

	private myRef: any;

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			loginClicked: false,
			accountClicked: false,
			signOut: false,
			currentMenuItem: 'peers-spanmenuitem',
		};

		this.myRef = createRef<HTMLDivElement>();

		this.openAccount = this.openAccount.bind(this);
		this.renderInfo = this.renderInfo.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(showLoading(true));
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
		newQuests.push(<NewQuest key='fake1' fake={true} id='0' title='sdf' />);
		newQuests.push(<NewQuest key='fake2' fake={true} id='0' title='sdf' />);
		newQuests.push(<NewQuest key='fake3' fake={true} id='0' title='sdf' />);
		newQuests.push(<NewQuest key='fake4' fake={true} id='0' title='sdf' />);
		return newQuests;
	}

	openAccount(openAccount: boolean) {
		// open account modal
		this.setState({ accountClicked: openAccount });
		if (openAccount) {
			this.props.dispatch(getUser());
		}
	}

	handleMenuClick(id: string) {
		this.setState({currentMenuItem: id});
	}

	renderInfo() {
		const {currentMenuItem} = this.state;

		if (currentMenuItem === 'quest-spanmenuitem') {
			return <Quests entries={this.props.entries} />;
		} else if (currentMenuItem === 'skills-spanmenuitem') {
			return null;
		} else {
			return <Feed entries={this.props.entries} {...this.props.comments} />;
		}
	}

	render() {
		const { accountClicked } = this.state;
		if (this.state.isLoading) {
			return (
				<div></div>
			);
		}
		const { quests } = this.props;
		const inventory = this.getInveotryComponents(quests.inventory);
		const isProfileComplete = this.checkIfProfileComplete(this.props.profile);
		return(
			<div className='dashboard-container'>
				<Account openAccount={this.openAccount} accountClicked={accountClicked} isProfileComplete={isProfileComplete} />
				{!isProfileComplete ? null :
					<div className='dashboard'>
						<div className='hotspot'>
							<Avatar profile={this.props.profile} openAccount={this.openAccount} />
							<div className='quest-invetory'>
								{inventory}
							</div>
						</div>
						<div className='infotainment'>
							<Menu handleMenuClick={this.handleMenuClick} />
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
		profile: state.profileReducer,
		quests: state.questsReducer,
		entries: state.entryReducer,
		comments: state.commentsReducer,
	};
};

export default connect(mapStateToProps)(Dashboard);
