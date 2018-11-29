import React, { Component, createRef } from 'react';
import {connect} from 'react-redux';
import AvatarIcon from 'Common/avatar/avatar-icon';
import {formatDate} from 'Helpers/main-helper';
import CommentSvg from 'Assets/images/comment.svg';
import EmojiInput from 'Common/inputs/emoji-input';
import Comments from 'Common/comment';
import {postQuestComment} from 'Actions/index';

interface IProps { post: any; image: string; name: string; icon: string; created_on: string; entry: string; comments: any; id: number;
	dispatch: any; }
interface IState { comment: string; clearEditor: boolean; }

class FeedRow extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			comment: '',
			clearEditor: false,
		};
		this.onChangeCommentInput = this.onChangeCommentInput.bind(this);
		this.submitComment = this.submitComment.bind(this);
	}

	onChangeCommentInput(val: string) {
		// do something
		this.setState({ comment: val, clearEditor: false });
	}

	submitComment() {
		if (this.state.comment.trim().length > 0) {
			// dispatch post comment
			const { comment } = this.state;
			const { id } = this.props;
			this.props.dispatch(postQuestComment({ questEntryId: id, comment }));
			this.setState({ clearEditor: true });
		}
	}

	render() {
		const { name, icon, created_on, image, entry, comments } = this.props;
		const profile = {
			name,
			icon,
		};
		const dateString = formatDate(created_on);
		return (
			<div className='entry'>
				<div className='entry-info-container'>
					<AvatarIcon profile={profile} />
					<div className='info'>
						<div className='heading'>{name.toUpperCase()}</div>
						<div className='date'>{dateString}</div>
						<div className='school'>School Name</div>
					</div>
				</div>
				<div className='entry-img-container'>
					<img className='entry-img' src={image} />
				</div>
				<div className='comment-count'>
					<img src={CommentSvg} />
					<span>2 Comments</span>
				</div>
				<div className='entry-text'>
					{entry}
				</div>
				<Comments comments={comments}/>
				<EmojiInput placeholder={'Add a comment..'} onChange={this.onChangeCommentInput} clearEditor={this.state.clearEditor} />
				<button className='comment-submit' onClick={this.submitComment} >Submit</button>
			</div>
		);
	}
}

export default connect()(FeedRow);
