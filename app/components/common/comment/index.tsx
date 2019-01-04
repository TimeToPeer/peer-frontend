import React, {Component} from 'react';
import AvatarIcon from 'Common/avatar/avatar-icon';
import {formatDate} from 'Helpers/main-helper';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

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
	}
});

interface IProps { comments: any; classes: any; }
interface IState { showMore: boolean; }

class Comment extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.renderComments = this.renderComments.bind(this);
		this.showMore = this.showMore.bind(this);

		this.state = {
			showMore: false,
		}
	}

	renderCommentItem(item: any, count: number, length: number) {
		// render each comments here
		const { first_name, last_name, icon, comment, created_on, id, special_text } = item;
		const profile = {
			first_name,
			last_name,
			icon,
		}
		const { classes } = this.props;
		let show = '';
		if (length <= 3 || this.state.showMore) {
			show = 'show';
		} else {
			show = length-count > 3 ? 'hide' : 'show';
		}
		const dateString = formatDate(created_on);
		const name = `${first_name} ${last_name}`;
		return (
			<div className={classnames(classes['comment-container'], classes[show])} key={id}>
				<AvatarIcon profile={profile} size='small' />
				<div className={classes.comment}>
					<span className={classes.from}><b>{special_text || name}</b></span>
					<span>{comment}</span>
					<div className={classes.date}>{dateString}</div>
				</div>
			</div>
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
