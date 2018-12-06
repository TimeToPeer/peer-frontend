import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClassroomList from 'Components/teacher/dashboard/classroom/index';
import NewQuest from 'Common/new-quest';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import {mapIdToColor, formatDataWithoutTime} from 'Helpers/main-helper';
import {getClassroomData, showLoading, fetchinClassroomData} from 'Actions/index';


const styles = () => ({
	card: {
		width: '100%',
		display: 'inline-block',
		verticalAlign: 'top',
		margin: '0 5px',
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

interface IProps { entries: any; inventory: any; classes: any; dispatch: any; records: any }
interface IState { active: boolean; selectedId: string; isLoading: boolean; }
class Classroom extends Component<IProps, IState> {
    static getDerivedStateFromProps(props: any, state: any) {
		if (state.isLoading && !props.records.pending) {
			props.dispatch(showLoading(false));
			return { isLoading: false };
		}
		return {};
	}
	constructor(props: any) {
		super(props);
		this.state = {
            active: true,
            selectedId: props.inventory[0].id,
            isLoading: true,
		};
        this.activeQuests = this.activeQuests.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(showLoading(true));
        this.props.dispatch(getClassroomData({questId: this.state.selectedId}));
    }
    componentWillUnmount() {
        this.props.dispatch(fetchinClassroomData());
    }
    
    onClickHandler(id: string) {
        this.props.dispatch(showLoading(true));
        this.props.dispatch(fetchinClassroomData());
        this.setState({selectedId: id, isLoading: true});
        this.props.dispatch(getClassroomData({questId: id}));
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
                        hoverText={data[item].description}
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

    activeQuests(active: boolean) {
        this.setState({active: active, selectedId: null });
    }

	render() {
        const { inventory, classes } = this.props;
        const filteredInventory = this.getInveotryComponents(inventory);
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
                {!this.props.records.pending ? <ClassroomList records={this.props.records} /> : null }
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
    return {
        records: state.classroomReducer,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Classroom));
