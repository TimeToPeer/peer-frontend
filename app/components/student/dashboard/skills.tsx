import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSkills} from 'Actions/index';
import ScoreWheel from 'Common/wheel/score'
import Legend1 from 'Assets/images/hover4.png';
import Legend2 from 'Assets/images/hover3.png';
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
		margin: '0 0 0 5px',
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
        textAlign: 'center' as 'center',
        lineHeight: "normal",
	},
});

interface IProps { dispatch: any; match: any; entries: any; comments: any; feedback: any; skills: any; classes: any; }
interface IState { entryId: string; }

class Skills extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getSkills());
    }

    renderScoreWheel(id: string, critical: string, creative: string, responsible: string, teacher_critical: string, teacher_creative: string, teacher_responsible: string) {
        return (
            <React.Fragment>
                <div className='legend'>
                    <div className='legend-item'><img src={Legend1} /> Student </div>
                    <div className='legend-item'><img src={Legend2} /> Teacher</div>
                </div>
                <ScoreWheel id={`critical-wheel-${id}`} score = {Number(critical)} teacher_score={Number(teacher_critical)}
                    title='CRITICAL' description='I can support my opinions with facts' />
                <ScoreWheel id={`creative-wheel-${id}`} score = {Number(creative)} teacher_score={Number(teacher_creative)}
                    title='CREATIVE' description={"I can build on other people's ideas"} />
                <ScoreWheel id={`responsible-wheel-${id}`} score = {Number(responsible)} teacher_score={Number(teacher_responsible)}
                    title='COMMUNICATION' description='I can present information clearly.' />
            </React.Fragment>
        )
    }

    render() {
        const { pending} = this.props.skills;
        if (pending) return null;
        const { classes } = this.props;
        const { id=0, critical=0, creative=0, responsible=0, teacher_critical=0, teacher_creative=0,
            teacher_responsible=0} = this.props.skills.skills[0] || {};
        return(
            <Card className={classes.card}>
                <CardContent className={classes['content-container']}>
                    <Typography component='div' className={classes.content} >
                        <div className='assessment-container'>
                            {
                                this.renderScoreWheel(id, critical,creative,
                                    responsible, teacher_critical,
                                    teacher_creative, teacher_responsible)
                                
                            }
                        </div>
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
       skills: state.skillsReducer,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Skills));
