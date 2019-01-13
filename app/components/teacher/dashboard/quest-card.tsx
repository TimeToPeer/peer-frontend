import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from 'Common/avatar/avatar-icon';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {formatDate} from 'Helpers/main-helper';
import {postQuestComment} from 'Actions/index';
import Grid from '@material-ui/core/Grid';
import {imageUrl} from 'Helpers/main-helper';

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

interface IProps { classes: any; profile: any; dispatch: any; first_name: string; last_name: string; created_by: number;
	image: string; icon: string; created_on: string; entry: string; id: number; image_url: string; }

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
		const { first_name, last_name, icon, created_on, image_url: imgUrl, entry, created_by } = this.props;
		const profile = {
			first_name,
			last_name,
			icon,
		}
		const dateString = formatDate(created_on);
		const name = `${first_name} ${last_name}`.toUpperCase();
		return (
			<Grid item sm={4} xs={12}>
				<Card className={classes.card} onClick={this.onCardClick}>
					<CardHeader
                        avatar={<Avatar id={created_by} />}
                        title={name}
						subheader={dateString}
					/>
					<CardMedia
						className={classes.media}
						image={imageUrl(imgUrl)}
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
