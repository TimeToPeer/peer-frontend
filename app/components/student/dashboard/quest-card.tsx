import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/Styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {formatDate} from 'Helpers/main-helper';
import {postQuestComment} from 'Actions/index';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
	card: {
		width: '100%',
		display: 'inline-block',
		verticalAlign: 'top',
		margin: '0 5px',
		transition: 'all .1s ease-in-out',
		'&:hover': {
			transform: 'scale(1.1)',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		},
		cursor: 'pointer',
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
		height: '140px',
		overflow: 'hidden',
	},
});

interface IProps { classes: any; profile: any; dispatch: any;
	image: string; name: string; icon: string; created_on: string; entry: string; comments: any; id: number; }


class FeedCard extends React.Component<IProps, {}> {
	constructor(props: any) {
		super(props);

		this.onCardClick = this.onCardClick.bind(this);
	}
	onCardClick() {
		window.location.href = '/assessment/' + this.props.id;
	}
	
  	render() {
		const { classes } = this.props;
		const { created_on, image, entry } = this.props;

		const dateString = formatDate(created_on);
		return (
			<Grid item sm={4} xs={12}>
				<Card className={classes.card} onClick={this.onCardClick}>
					<CardHeader
						subheader={dateString}
					/>
					<CardMedia
						className={classes.media}
						image={image}
					/>
					<CardContent className={classes['content-container']}>
						<Typography component='p' className={classes.content} >
							{entry}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		);
  	}
}

export default withStyles(styles)(FeedCard);
