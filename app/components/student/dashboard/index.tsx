import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import NewQuest from 'Common/new-quest';
import Menu from 'Components/student/dashboard/menu';
import Feed from 'Common/feed';
import { getQuests, getPeerQuests, showLoading} from 'Actions/index';
import Account from 'Components/student/dashboard/account';
import Quests from 'Components/student/dashboard/quests';
import {mapIdToColor} from 'Helpers/main-helper';
import Skills from 'Components/student/dashboard/skills';

interface IState { isLoading: boolean; loginClicked: boolean; signOut: boolean; currentMenuItem: string; selectedQuest: string; }
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
			loginClicked: false,
			signOut: false,
			currentMenuItem: 'peers-spanmenuitem',
			selectedQuest: null,
		};

		this.myRef = createRef<HTMLDivElement>();

		this.renderInfo = this.renderInfo.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
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

	onClickHandler(id: string) {
		const questEntry = this.props.entries.entries.find((ent:any) => {
			return ent.created_by === this.props.profile.id &&
			ent.questId === id;
		}) || '';
		if (questEntry) {
			this.setState({selectedQuest: id, currentMenuItem:'quest-spanmenuitem' });
		} else {
			window.location.href = '/quest/' + id;
		}
	}

	getInveotryComponents(data: any) {
		const newQuests = [];
		let i = 0;
		function getRandomInt(max: number) {
            return Math.floor(Math.random() * Math.floor(max));
        }
		for (const item in data) {
			if (!data.hasOwnProperty(item)) {
				continue;
			}
			const questEntry = this.props.entries.entries && this.props.entries.entries.find((ent:any) => {
				return ent.created_by === this.props.profile.id &&
				ent.questId === data[item].id;
			}) || '';
			if (questEntry) {
				newQuests.push(
					<NewQuest key={i} id={data[item].id} title={data[item].title} 
						color={mapIdToColor(getRandomInt(8))}
						text='You have a new QUEST!'
						hoverText={data[item].description}
						image={questEntry.image}
						onClickHandler={this.onClickHandler}
					/>
				);
			} else {
				newQuests.unshift(
					<NewQuest key={i} id={data[item].id} title={data[item].title} color='hershey'
						text='You have a new QUEST!'
						hoverText={data[item].description}
						image={questEntry.image}
						onClickHandler={this.onClickHandler}
					/>
				);
			}
			i++;
        } 
        for(let i=0; i < 8; i++) {
            newQuests.push(<NewQuest key={`fake${i}`} fake={true} id='0' text='N/A' title='N/A' color={mapIdToColor(getRandomInt(8))} />);
        }
		return newQuests;
	}

	handleMenuClick(id: string) {
		this.setState({currentMenuItem: id});
	}

	getFilteredQuests(entries: any, selectedQuest: string) {
        const entryArr: any = [];
        
		if (entries && entries.length > 0) entries.forEach((item: any) => {
			if(item.questId === selectedQuest) entryArr.push(item);
		});
        return entryArr;
    }

	renderInfo(id: string) {
		const {currentMenuItem, selectedQuest} = this.state;
		let entries = this.props.entries;
		if (selectedQuest) {
			entries = this.getFilteredQuests(entries, selectedQuest);
		}
		if (currentMenuItem === 'quest-spanmenuitem') {
			return <Quests entries={this.props.entries} myId={id} selectedQuest={selectedQuest} />;
		} else if (currentMenuItem === 'skills-spanmenuitem') {
			return <Skills />;
		} else {
			return <Feed entries={this.props.entries} {...this.props.comments} />;
		}
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div></div>
			);
		}
		const { quests, profile } = this.props;
		const inventory = this.getInveotryComponents(quests.inventory);
		const isProfileComplete = this.checkIfProfileComplete(profile);
		
		return(
			<div className='dashboard-container'>
				<div className='dashboard'>
					<div className='hotspot'>
						<Account profile={this.props.profile} />
						<div className='quest-inventory'>
							{inventory}
						</div>
					</div>
					{!isProfileComplete ? null :
						<div className='infotainment'>
							<Menu handleMenuClick={this.handleMenuClick} current={this.state.currentMenuItem} />
							{this.renderInfo(profile.id)}
						</div>
					}
				</div>
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
