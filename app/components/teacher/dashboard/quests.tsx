import React, {Component} from 'react';
import QuestCard from 'Components/teacher/dashboard/quest-card';
import Grid from '@material-ui/core/Grid';
import NewQuest from 'Common/new-quest';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import {mapIdToColor, formatDataWithoutTime} from 'Helpers/main-helper';


const styles = () => ({
	card: {
		width: '100%',
		display: 'inline-block',
		verticalAlign: 'top',
		margin: '0 0 0 5px',
        marginBottom: '25px',
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
    'content-container': {
        paddingTop: '0px',
    }
});

interface IProps { entries: any; inventory: any; classes: any; }
interface IState { active: boolean; selectedId: string; }
class Quests extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
            active: true,
            selectedId: null,
		};

        this.activeQuests = this.activeQuests.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.getFilteredQuests = this.getFilteredQuests.bind(this);
    }
    
    onClickHandler(id: string) {
		this.setState({selectedId: id});
    }
    

    getInveotryComponents(data: any) {
        const { active } = this.state;
		const newQuests = [];
        let i = 0;
        function getRandomInt(max: number) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        
        if (active) newQuests.push(<NewQuest key={'new'} id={0} title='' text='+ NEW' />);
		for (const item in data) {
			if (!data.hasOwnProperty(item)) {
				continue;
            }
            if (!!+data[item].active === active) {
                const formattedTime = formatDataWithoutTime(data[item].create_time);
                newQuests.push(
                    <NewQuest
                        key={i} id={data[item].id} title='' text={`QUEST ${formattedTime}`}
                        color={mapIdToColor(getRandomInt(8))}
                        onClickHandler={this.onClickHandler}
                    />
                );
                i++;
            }
        } 
        for(let i=0; i < 8; i++) {
            newQuests.push(<NewQuest key={`fake${i}`} fake={true} id='0' text='N/A' color={mapIdToColor(getRandomInt(8))} />);
        }
		return newQuests;
    }
    
	renderQuests(entries: any) {
		const entryArr: any = [];
		if (entries && entries.length > 0) entries.forEach((item: any) => {
			entryArr.push(<QuestCard key={item.id} {...item} />);
		});
		return entryArr;
    }
    
    activeQuests(active: boolean) {
        this.setState({active: active, selectedId: null });
    }

    getFilteredQuests(entries: any) {
        const { selectedId } = this.state;
        const entryArr: any = [];
        if (selectedId) {
            if (entries && entries.length > 0) entries.forEach((item: any) => {
                if(item.questId === selectedId) entryArr.push(item);
            });
        } else {
            if (entries && entries.length > 0) entries.forEach((item: any) => {
                entryArr.push(item);
            });
        }
        return entryArr;
    }

	render() {
        const { inventory, classes } = this.props;
        const { entries } = this.props.entries;
        const filteredInventory = this.getInveotryComponents(inventory);
        const filteredEntries = this.getFilteredQuests(entries);
		return (
			<div className='teacher-quest-entries-col-container'>
                <Card className={classes.card}>
                    <CardHeader
						subheader={
                            <div className='my-library'>
                                <div className='header'>My Library</div>
                                    <div className='sub-header'>
                                        <span onClick={() => this.activeQuests(true)}>ACTIVE</span>
                                        <span onClick={() => this.activeQuests(false)}>INACTIVE</span>
                                    </div>
                            </div>
                        }
					/>
					<CardContent className={classes['content-container']}>
						<Typography component='div' className={classes.content} >
                            <div className='quest-inventory'>
                                {filteredInventory}
                            </div>
						</Typography>
					</CardContent>
                </Card>
				<Grid container spacing={24}>
					{this.renderQuests(filteredEntries)}
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Quests);
