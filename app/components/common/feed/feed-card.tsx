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
import Glow from 'Assets/images/glow.png';
import Glowing from 'Assets/images/glowing.png';
import Grow from 'Assets/images/grow.png';
import Growing from 'Assets/images/growing.png';
import classnames from 'classnames';
import Colors from 'Styles/colors.scss';
import {getPostedComment} from 'Selectors/index';


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
		border: `2px solid ${Colors.salt}`,
		height: '40px',
		fontSize: '12pt',
		margin: '5px 24px 14px 0',
		cursor: 'pointer',
		'&:hover': {
			borderColor: `${Colors.grape}`,
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
		borderTop: `2px solid ${Colors.salt}`,
	},
	icon: {
		position: 'absolute' as 'absolute',
		cursor: 'pointer',
	},
	glow: {
		width: '26px',
		height: '39px',
		bottom: '10px',
		left: '34px',
	},
	glowing: {
		width: '46px',
		height: '61px',
		bottom: '0px',
	},
	grow: {
		width: '38px',
		height: '39px',
		bottom: '10px',
		left: '78px',
	},
	growing: {
		width: '37x',
		height: '50px',
		bottom: 0,
		left: '78px',
	},
	typeContainer: {
		position: 'relative' as 'relative',
		height: '57px',
		padding: '5px 0 0 24px',
	},
	inactive: {
		borderColor: '#cccccc !important',
		color: '#cccccc',
		cursor: 'not-allowed',
	}
});

interface IProps { classes: any; profile: any; dispatch: any; disableComment: boolean; feedback?: any;
	image_url: string; first_name: string; last_name: string; icon: string; created_on: string;
	entry: string; comments: any; id: number; myComment: boolean; noError: boolean; }
interface IState { expanded: boolean; comment: string; clearEditor: boolean; glow: boolean; grow: boolean; disableCommentClick: boolean; posting: boolean; error: boolean; vote: number; }

class FeedCard extends React.Component<IProps, IState> {
	static getDerivedStateFromProps(props: any, state: any) {
		if (!props.noError) {
			return {disableCommentClick: false};
		} 
		if (state.disableCommentClick && (state.glow || state.grow)) {
			return {disableCommentClick: false};
		}
		return {};
	}

	constructor(props: any) {
		super(props);

		this.state = {
			expanded: false,
			comment: '',
			clearEditor: false,
			glow: false,
			grow: false,
			disableCommentClick: true,
			posting: false,
			error: false,
			vote: 0,
		};

		this.onChangeCommentInput = this.onChangeCommentInput.bind(this);
		this.submitComment = this.submitComment.bind(this);
		this.onGrowClick = this.onGrowClick.bind(this);
		this.onGlowClick = this.onGlowClick.bind(this);
	}

	onGrowClick() {
		if (!this.state.glow) this.setState({grow: !this.state.grow});
	}

	onGlowClick() {
		if (!this.state.grow) this.setState({glow: !this.state.glow});
	}

  	onChangeCommentInput(val: string) {
		this.setState({ comment: val, clearEditor: false });
	}

	setGlowGrow (glow: boolean, grow: boolean) {
		if (glow) return 1;
		else if(grow) return 2;
		return 0;
	}

	submitComment() {
		if (this.state.comment.trim().length > 0) {
			this.setState({posting: true, disableCommentClick: true});
			// dispatch post comment
			const { comment, glow, grow } = this.state;
			const { id } = this.props;
			const glowGrow = this.setGlowGrow(glow, grow);
			this.props.dispatch(postQuestComment({ questEntryId: id, comment, glowGrow }));
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
		const {glow, grow, disableCommentClick} = this.state;
		const dateString = formatDate(created_on);
		const name = `${first_name} ${last_name}`.toUpperCase();
		const glowSrc = glow ? Glowing : Glow;
		const growSrc = grow ? Growing : Grow;
		const glowClass = glow ? 'glowing': 'glow';
		const growClass = grow ? 'growing': 'grow';
		const disabledCommentClass = disableCommentClick ? 'inactive' : 'active';
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
						<Comments comments={comments} showThumbs={!this.props.feedback} />
					</Typography>
				</CardContent>
				{disableComment ? null :
					<div>
						<EmojiInput placeholder={'Add a comment..'} onChange={this.onChangeCommentInput} clearEditor={this.state.clearEditor} />
						<div className={classes.typeContainer}>
							<img className={classnames(classes[glowClass], classes.icon)} src={glowSrc} onClick={this.onGlowClick} title="What are their streights?"/>
							<img className={classnames(classes[growClass], classes.icon)} src={growSrc} onClick={this.onGrowClick} title="What do they need to work on?" />
						</div>
						<button className={classnames(classes.submit, classes[disabledCommentClass])} onClick={this.submitComment}>Submit</button>
					</div>
                }
			</Card>
		);
  	}
}

const mapStateToProps = (store: any, props: any) => {
	return {
		myComment: getPostedComment(store.commentsReducer.comments, props.id, store.profileReducer.id),
		noError: store.errorReducer.success,
	}
};

export default connect(mapStateToProps)(withStyles(styles)(FeedCard));
