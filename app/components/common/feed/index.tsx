import React, {Component} from 'react';
import FeedCard from 'Common/feed/feed-card';

interface IProps { entries: any; comments: any; disableComment?: boolean; feedback?: any; }

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
			const questEntryId = data[item].id;
			const comments = this.props.comments.filter((com: any) => com.quest_entry_id === questEntryId );
			newQuests.push(<FeedCard key={i} {...data[item]} comments={comments} disableComment={this.props.disableComment} feedback={this.props.feedback} />);
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

export default Feed;
