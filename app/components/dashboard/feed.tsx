import React, {Component} from 'react';
import FeedRow from 'Components/dashboard/feed-row';
import {formatDate} from 'Helpers/main-helper';
import AvatarIcon from 'Common/avatar/avatar-icon';

interface IProps { entries: any; }

class Feed extends Component<IProps, {}> {
	constructor(props: any) {
		super(props);
	}

	renderEntry(item: any, key: number) {
		const dateString = formatDate(item.created_on);
		const { name, icon } = item;
		const profile = {
			name,
			icon,
		};
		return (
			<div key={key} className='entry'>
				<div className='entry-info-container'>
					<AvatarIcon profile={profile} />
					<div className='info'>
						<div className='heading'>{name.toUpperCase()}</div>
						<div className='date'>{dateString}</div>
						<div className='school'>School Name</div>
					</div>
				</div>
				<FeedRow post={item.entry} />
			</div>
		);
	}

	getEntryComponents(data: any) {
		const newQuests = [];
		let i = 0;
		for (const item in data) {
			if (!data.hasOwnProperty(item)) {
				continue;
			}
			newQuests.push(this.renderEntry(data[item], i));
			i++;
		}
		return newQuests;
	}

	render() {
		const fuck = this.getEntryComponents(this.props.entries.entries);
		return(
			<div>{fuck}</div>
		);
	}
}

export default Feed;
