import React, {Component} from 'react';
import {getQuestById, submitQuest} from 'Actions/index';
import {connect} from 'react-redux';
import AvatarIcon from 'Common/avatar/avatar-icon';
import {formatDate} from 'Helpers/main-helper';
import QuestReponse from 'Components/quests/response';
import { convertToRaw } from 'draft-js';

interface IProps { dispatch: any; questId: string; match: any; quest: any; entry: any; }
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
	}

	componentDidMount() {
		const { questId } = this.state;
		this.props.dispatch(getQuestById({ questId }));
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
		const { title, name, icon, create_time, description } = this.props.quest;
		const teacherProfile = {
			name,
			icon,
		};
		const dateString = formatDate(create_time);

		return (
			<div className='quest-page'>
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
					<div className='post-button' onClick={this.responseMode}>
						POST
					</div>
				</div>
			</div>
		);
	}

	render() {
		if (this.props.quest.pending) {
			return <div></div>;
		}

		return(
			<div>
				{this.state.responseMode ? <QuestReponse questId={this.state.questId} /> : this.renderQuestInfo() }
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		quest: state.questsReducer,
	};
};

export default connect(mapStateToProps)(Quests);
