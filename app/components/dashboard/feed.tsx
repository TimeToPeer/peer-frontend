import React, {Component} from 'react';
import FeedRow from 'Components/dashboard/feed-row';

interface IProps { entries: any; comments: any; }

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
			newQuests.push(<FeedRow key={i} {...data[item]} comments={comments} />);
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
