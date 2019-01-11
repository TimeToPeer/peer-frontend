import React, {Component} from 'react';
import {connect} from 'react-redux';
import FeedCard from 'Common/feed/feed-card';

interface IProps { entries: any; comments: any; disableComment?: boolean; feedback?: any; currentUserId: any; }

class Feed extends Component<IProps, {}> {
	constructor(props: any) {
		super(props);
	}

	getEntryComponents(data: any) {
		const newQuests = [];
		let i = 0;
		for (const item in data) {
			if (!data.hasOwnProperty(item)) {
				continue;
			}
			const { comments, currentUserId, disableComment } = this.props;
			const questEntryId = data[item].id;
			const thisComments = comments.filter((com: any) => com.quest_entry_id === questEntryId );
			const alreadyCommented = thisComments.find((com: any) => com.created_by === currentUserId);
			newQuests.push(<FeedCard key={i} {...data[item]} comments={thisComments} disableComment={disableComment || alreadyCommented} feedback={this.props.feedback} />);
			i++;
		}
		return newQuests;
	}

	render() {
		const entry = this.getEntryComponents(this.props.entries.entries);
		return(
			<div>{entry}</div>
		);
	}
}

const mapStateToProps = (store: any) => ({
	currentUserId: store.profileReducer.id,
});

export default connect(mapStateToProps)(Feed);
