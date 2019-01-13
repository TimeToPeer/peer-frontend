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
import {voteComment} from 'Actions/index';
import {connect} from 'react-redux';

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

interface IProps { commentItem: any; showThumbs: boolean; length: number; showMore: boolean; count: number; classes: any; dispatch: any; votes: any; }
interface IState { showMore: boolean; vote: string; }

class CommentItem extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
        const commentId = props.commentItem.id;
        const myId = props.myId;
        const myVote = props.votes && props.votes.find((item: any) => item.comment_id === commentId && item.created_by === myId);
		this.state = {
			showMore: false,
			vote: myVote ? myVote.type : '',
		}

        this.voteClick = this.voteClick.bind(this);
	}

	voteClick(type: string) {
        const { vote } = this.state;
        const { commentItem } = this.props;
        const { id } = commentItem;
		if (vote === type) {
            this.setState({vote: ''});
            this.props.dispatch(voteComment({ commentId: id, type: '' }));
		} else {
            this.setState({ vote: type });
            this.props.dispatch(voteComment({ commentId: id, type }));
        }
	}

	render() {
        const { commentItem, length, showMore, classes, count, showThumbs } = this.props;
		const { first_name, last_name, comment, created_on, id, special_text, glow_grow, created_by } = commentItem;
		let show = '';
		if (length <= 3 || showMore) {
			show = 'show';
		} else {
			show = length-count > 3 ? 'hide' : 'show';
		}
		const dateString = formatDate(created_on);
		const name = `${first_name} ${last_name}`;
		const upClass = this.state.vote === 'up' ? 'active' : '';
		const downClass = this.state.vote === 'down' ? 'active' : '';
		return (
			<div className={classnames(classes['comment-container'], classes[show])} key={id}>
				<AvatarIcon id={created_by} size='small' />
				{glow_grow === 1 ? <img className={classnames(classes.glowing)} src={Glowing} /> : null }
				{glow_grow === 2 ? <img className={classnames(classes.growing)} src={Growing} /> : null }
				<div className={classes.comment}>
					<span className={classes.from}><b>{special_text || name}</b></span>
					<span>{comment}</span>
					<div className={classes.date}>{dateString}</div>
					{showThumbs ? 
						<div className={classes['thumbs-up-down']}>
							<span className={classes.vote} onClick={(e) => this.voteClick('up')}>
								<img className={classes['thumbs-up']} src={ThumbsUp} />
								<span className={classes[upClass]}>Helpful</span>
							</span>
							<span className={classes.vote} onClick={(e) => this.voteClick('down')}>
								<img className={classes['thumbs-down']} src={ThumbsDown} />
								<span className={classes[downClass]}>Not Helpful</span>
							</span>
						</div> : null
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (store: any) => ({
    myId: store.profileReducer.id,
	votes: store.commentsReducer.votes,
	
})

export default connect(mapStateToProps)(withStyles(styles)(CommentItem));
