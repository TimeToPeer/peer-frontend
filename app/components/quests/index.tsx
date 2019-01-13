import React, {Component} from 'react';
import {getQuestById, submitQuest, getUser, fetchUsers} from 'Actions/index';
import {connect} from 'react-redux';
import AvatarIcon from 'Common/avatar/avatar-icon';
import {formatDate} from 'Helpers/main-helper';
import QuestReponse from 'Components/quests/response';
import { convertToRaw } from 'draft-js';
import { getTeacherId } from 'Selectors/index';

interface IProps { dispatch: any; questId: string; match: any; quest: any; entry: any; teacherId: number; profile: any; usersPending: boolean; }
interface IState { questId: string; responseMode: boolean; }

class Quests extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		const questId = this.props.match.params.id;
		this.state = {
			questId,
			responseMode: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.responseMode = this.responseMode.bind(this);
		props.dispatch(getQuestById({ questId }));
		props.dispatch(getUser());
		props.dispatch(fetchUsers());
	}

	onSubmit(currnetContent: any) {
		if (currnetContent.hasText()) {
			const {questid} = this.props.quest;
			const rawContent = convertToRaw(currnetContent);
			const jsonContent = JSON.stringify(rawContent);
			this.props.dispatch(submitQuest({questid, entry: jsonContent }));
		}
	}

	responseMode() {
		this.setState({responseMode: true});
	}

	renderQuestInfo() {
		const { quest, teacherId } = this.props;
		const { title, first_name, last_name, create_time, description } = quest;
		const dateString = formatDate(create_time);

		return (
			<div className='quest-page'>
				<div className='quest-container'>
					<div className='quest-description'>
						{description}
					</div>
				</div>
				<div className='teacher-info'>
					<AvatarIcon id={teacherId} />
					<div className='info'>
						<div className='heading'>{`${title} by ${first_name} ${last_name}`}</div>
						<div className='date'>{dateString}</div>
					</div>
					<div className='post-button' onClick={this.responseMode}>
						START
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { quest, profile, usersPending } = this.props;
		if (quest.pending || profile.pending || usersPending) {
			return <div></div>;
		}
		return(
			<div>
				{this.state.responseMode ?
					<QuestReponse questId={this.state.questId} text={this.props.quest.description}/>
					: this.renderQuestInfo()
				}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		quest: state.questsReducer,
		profile: state.profileReducer,
		usersPending: state.usersReducer.pending,
		teacherId: getTeacherId(state.usersReducer.users),
	};
};

export default connect(mapStateToProps)(Quests);
