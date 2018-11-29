import React, {Component} from 'react';
import AvatarIcon from 'Common/avatar/avatar-icon';
import {formatDate} from 'Helpers/main-helper';

interface IProps { comments: any; }

class Comment extends Component<IProps, {}> {
	constructor(props: any) {
		super(props);
		this.renderComments = this.renderComments.bind(this);
	}

	renderCommentItem(item: any) {
		// render each comments here
		const { name, icon, comment, created_on, id } = item;
		const profile = {
			name,
			icon,
		};
		const dateString = formatDate(created_on);
		return (
			<div className='comment' key={id}>
				<AvatarIcon profile={profile} />
				<div className='comment-text'>
					<span className='from'><b>{name}</b></span>
					<span className='text'>{comment}</span>
					<div className='date'>{dateString}</div>
				</div>
			</div>
		);
	}

	renderComments() {
		// loop through coments here
		const comments = this.props.comments;
		const commentArr: any = [];
		comments.forEach((comment: any) => {
			commentArr.push(this.renderCommentItem(comment));
		});
		return commentArr;

	}

	render() {
		if (this.props.comments.length > 0) {
			return (
				<div className='comments-container'>
					{this.renderComments()}
				</div>
			);
		}
		return null;
	}
}

export default Comment;
