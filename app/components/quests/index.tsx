import React, {Component} from 'react';
import {getQuestById, submitQuest, getQuestEntry} from 'Actions/index';
import {connect} from 'react-redux';
import NavBar from 'Components/nav-bar';
import MenuBar from 'Components/dashboard/menu';
import AvatarIcon from 'Common/avatar/avatar-icon';
import {formatDate} from 'Helpers/main-helper';
import RichEditor from 'Common/inputs/rich-input';
import { convertToRaw } from 'draft-js';

interface IProps { dispatch: any; questId: string; match: any; quest: any; entry: any; }
interface IState { questId: string; entryVal: string; }

class Quests extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		const questId = this.props.match.params.id;
		this.state = {
			questId,
			entryVal: '',
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const { questId } = this.state;
		this.props.dispatch(getQuestById({ questId }));
		this.props.dispatch(getQuestEntry({ questId }));
	}

	onSubmit(currnetContent: any) {
		if (currnetContent.hasText()) {
			const {questid} = this.props.quest;
			const rawContent = convertToRaw(currnetContent);
			const jsonContent = JSON.stringify(rawContent);
			this.props.dispatch(submitQuest({questid, entry: jsonContent }));
		}
	}

	render() {
		if (this.props.quest.pending || this.props.entry.pending) {
			return <div></div>;
		}
		const { title, description, create_time, name, icon } = this.props.quest;
		const teacherProfile = {
			name,
			icon,
		};
		const dateString = formatDate(create_time);

		return(
			<div>
				<NavBar />
				<MenuBar />
				<div className='quest-container'>
					<div className='quest-description'>
						{description}
					</div>
				</div>
				<div className='teacher-info'>
					<AvatarIcon profile={teacherProfile} />
					<div className='info'>
						<div className='heading'>{`${title} by ${name}`}</div>
						<div className='date'>{dateString}</div>
					</div>
				</div>
				<RichEditor entry={this.props.entry} onSubmit={this.onSubmit}/>
			</div>
		);
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		quest: state.questsReducer,
		entry: state.entryReducer,
	};
};

export default connect(mapStateToProps)(Quests);
