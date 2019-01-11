import React, {Component} from 'react';
import AvatarIcon from 'Common/avatar/avatar-icon';
import {formatDate} from 'Helpers/main-helper';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import ThumbsUp from 'Assets/images/thumbsup.png';
import ThumbsDown from 'Assets/images/thumbsdown.png';
import Glowing from 'Assets/images/glowing.png';
import Growing from 'Assets/images/growing.png';
import Colors from 'Styles/colors.scss';
import CommentItem from 'Components/common/comment/item';

const styles = () => ({
	'comment': {
		display: 'inline-block',
		marginLeft: '10px',
		width: '85%',
	},
	'comment-container': {
		marginBottom: '14px',
	},
	'container': {
		paddingLeft: '24px',
		paddingRight: '24px',
		paddingTop: '24px',
	},
	hide: {
		display: 'none',
	},
	show: {
		display: 'block',
	},
	'show-more': {
		textAlign: 'center' as 'center',
		cursor: 'pointer',
		fontFamily: 'GothicRegular, Arial',
		'&:hover': {
			opacity: 0.7,
		}
	},
	from: {
		marginRight: '14px',
	},
	date: {
		fontSize: '10pt',
	},
	'thumbs-up-down': {
		fontSize: '8pt',
		'& img': {
			width: '21px',
			height:'19px',
			verticalAlign: 'middle',
			marginRight: '3px',
		},
	},
	glowing: {
		width: '36px',
		verticalAlign: 'top',
		marginLeft: '5px',
	},
	growing: {
		width: '37px',
		verticalAlign: 'top',
		marginLeft: '5px',
	},
	vote: {
		cursor: 'pointer',
		padding: '5px 3px',
    	borderRadius: '5px',
		'&:hover': {
			backgroundColor: `${Colors.salt}`,
		},
		marginRight: '20px',
	},
	active: {
		color: `${Colors.grape}`
	}
});

interface IProps { comments: any; classes: any; showThumbs: boolean; onVoteClick(type: string): void; }
interface IState { showMore: boolean; vote: string; }

class Comment extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.renderComments = this.renderComments.bind(this);
		this.showMore = this.showMore.bind(this);

		this.state = {
			showMore: false,
			vote: '',
		}
	}


	renderCommentItem(item: any, count: number, length: number) {
		return (
			<CommentItem key={item.id} count={count} commentItem={item} length={length} showThumbs={this.props.showThumbs} showMore={this.state.showMore} />
		);
	}

	renderComments() {
		// loop through coments here
		const comments = this.props.comments;
		const commentArr: any = [];
		let count = 0;
		comments.forEach((comment: any) => {
			commentArr.push(this.renderCommentItem(comment, count, comments.length));
			if (!this.state.showMore) count++;
		});
		return commentArr;

	}

	showMore() {
		this.setState({ showMore: !this.state.showMore });
	}

	render() {
		const { classes, comments } = this.props;
		if (comments.length > 0) {
			return (
				<div className={classes.container}>
					{comments.length > 3 ?
						<div className={classes['show-more']} onClick={this.showMore}>{!this.state.showMore ? 'Show More Comments' : 'Show Less Comments'}</div>
					: null }
					{this.renderComments()}
				</div>
			);
		}
		return null;
	}
}

export default withStyles(styles)(Comment);
