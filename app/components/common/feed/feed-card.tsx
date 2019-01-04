import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from 'Common/avatar/avatar-icon';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import {formatDate, imageUrl} from 'Helpers/main-helper';
import Comments from 'Common/comment';
import EmojiInput from 'Common/inputs/emoji-input';
import {postQuestComment} from 'Actions/index';
import {connect} from 'react-redux';
import CommentSvg from 'Assets/images/comment.svg';
import Assessment from 'Common/feed/assessment';

const styles = (theme: any) => ({
	card: {
		width: '100%',
		marginTop: '24px',
		marginBottom: '24px',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		backgroundSize: 'contain',
	},
	avatar: {
		backgroundColor: '#33ff11',
		fontFamily: 'JosefinRegular, Arial',
	},
	content: {
		fontFamily: 'GothicRegular, Arial',
		fontSize: '12pt',
	},
	submit: {
		backgroundColor: 'white',
		border: '2px solid #f0f4f6',
		height: '40px',
		fontSize: '12pt',
		margin: '5px 24px 14px 0',
		'&:hover': {
			borderColor: '#f8e8fb',
		},
		marginLeft: '24px',
	},
	'comment-svg': {
		width: '20px',
		height: '20px',
		marginRight: '10px',
	},
	'comments-count': {
		display: 'flex' as 'flex',
		alignItems: 'center' as 'center',
	},
	'comment-count-text': {
		fontFamily: 'GothicRegular, Arial',
		fontSize: '10pt',
	},
	divider: {
		borderTop: '2px solid #f0f4f6',
	}
});

interface IProps { classes: any; profile: any; dispatch: any; disableComment: boolean; feedback?: any;
	image_url: string; first_name: string; last_name: string; icon: string; created_on: string;
	entry: string; comments: any; id: number; }
interface IState { expanded: boolean; comment: string; clearEditor: boolean; }

class FeedCard extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			expanded: false,
			comment: '',
			clearEditor: false,
		};

		this.onChangeCommentInput = this.onChangeCommentInput.bind(this);
		this.submitComment = this.submitComment.bind(this);
	}

  	onChangeCommentInput(val: string) {
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
		const { classes } = this.props;
		const { first_name, last_name, icon, created_on,  image_url: imgUrl, entry, comments, disableComment } = this.props;
		const profile = {
			first_name,
			last_name,
			icon,
		}
		const dateString = formatDate(created_on);
		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={<Avatar profile={profile} />}
					title={name}
					subheader={dateString}
				/>
				<CardMedia
					className={classes.media}
					image={imageUrl(imgUrl)}
				/>
				<CardContent>
					<Typography component='div' className={classes.content}>
						<div className={classes['comments-count']}>
							<img className={classes['comment-svg']} src={CommentSvg} />
							<span className={classes['comment-count-text']}>{comments.length} Comments</span>
						</div>
					</Typography>
					<Typography component='p' className={classes.content}>
						{entry}
					</Typography>
				</CardContent>
				{this.props.feedback !== undefined ? 
					<Collapse in={true} timeout="auto" unmountOnExit className={classes.divider}>
						<Assessment entry={this.props} feedback={this.props.feedback} />
					</Collapse>
				: null}
				<CardContent className={classes.divider}>
					<Typography component='div' className={classes.content}>
						<div>PEER TO PEER COMMENTS</div>
						<Comments comments={comments}/>
					</Typography>
				</CardContent>
				{disableComment ? null :
					<div>
						<EmojiInput placeholder={'Add a comment..'} onChange={this.onChangeCommentInput} clearEditor={this.state.clearEditor} />
						<button className={classes.submit} onClick={this.submitComment}>Submit</button>
					</div>
                }
			</Card>
		);
  	}
}

export default connect()(withStyles(styles)(FeedCard));
