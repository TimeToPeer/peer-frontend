import React, {Component} from 'react';
import QuestCard from 'Components/student/dashboard/quest-card';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = () => ({
	card: {
		width: '100%',
		height: '100%',
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
		fontSize: '16pt',
		overflow: 'hidden',
		marginTop: '170px',
		textAlign: 'center' as 'center',
	},
});


interface IProps { entries: any; myId: string; classes: any; selectedQuest: any; }
interface IState { isOpen: boolean; critical: number; creative: number; responsible: number; }
class Quests extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			isOpen: false,
			critical: 0,
			creative: 0,
			responsible: 0,
		};

		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.onCardClick = this.onCardClick.bind(this);
	}

	openModal(item: any) {
		this.setState({
			isOpen: true,
			critical: item.critical,
			creative: item.creative,
			responsible: item.responsible,
		});
	}

	closeModal() {
		this.setState({isOpen: false});
	}

	renderQuests(entries: any) {
		const entryArr: any = [];
		if (entries && entries.length > 0) entries.forEach((item: any) => {
			if (this.props.myId === item.created_by) {
				entryArr.push(<QuestCard key={item.id} {...item} />);
			}
		});
		return entryArr;
	}

	onCardClick() {
		window.location.href = '/quest/' + this.props.selectedQuest;
	}

	render() {
		const { entries } = this.props.entries;
		const { classes } = this.props;
		return (
			<div className='quest-entries-col-container'>
				<Grid container spacing={24}>
					{this.props.selectedQuest ? 
					<Grid item sm={4} xs={12}>
						<Card className={classes.card} onClick={this.onCardClick}>
							<CardContent className={classes['content-container']}>
								<Typography component='p' className={classes.content} >
									SUBMIT A NEW ENTRY!
								</Typography>
							</CardContent>
						</Card>
					</Grid> : null
					}
					{this.renderQuests(entries)}
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Quests);
