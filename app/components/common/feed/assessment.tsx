import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import Wheel from 'Common/wheel';
import ScoreWheel from 'Common/wheel/score'
import Comments from 'Common/comment';
import EmojiInput from 'Common/inputs/emoji-input';
import {postAssessment} from 'Actions/index';
import Legend1 from 'Assets/images/hover4.png';
import Legend2 from 'Assets/images/hover3.png';

interface IProps { dispatch: any; entry: any; feedback: any; }
interface IState { critical: number, creative: number, responsible: number; comment: string; }

class Assessment extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            critical: 0,
			creative: 0,
            responsible: 0,
            comment: '',
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.onWheelClick = this.onWheelClick.bind(this);
    }

    onWheelClick(id: string, val: string) {
		const target: string = id.substring(0, id.indexOf('-'));
		const valNum = Number(val) + 1;
		this.setState({ [target]: valNum } as any);
    }
    
    onInputChange(val: string) {
        this.setState({comment: val});
    }

    submitComment() {
        const { critical, creative, responsible, comment } = this.state;
        const { id } = this.props.entry;
        this.props.dispatch(postAssessment({id, critical, creative, responsible, comment}));
    }

    renderAssessmentWheel() {
        return (
            <React.Fragment>
                <Wheel id='critical-wheel' onWheelClick={this.onWheelClick} type='teacher'
                    title='CRITICAL' description='I can support my opinions with facts.' />
                <Wheel id='creative-wheel' onWheelClick={this.onWheelClick} type='teacher'
                    title='CREATIVE' description={`I can build on other people's ideas.`}/>
                <Wheel id='responsible-wheel' onWheelClick={this.onWheelClick} type='teacher'
                    title='COMMUNICATION' description='I can present information clearly.'/>
            </React.Fragment>
        )
    }

    renderScoreWheel(critical: string, creative: string, responsible: string, teacher_critical: string, teacher_creative: string, teacher_responsible: string) {
        return (
            <React.Fragment>
                <div className='legend'>
                    <div className='legend-item'><img src={Legend1} /> Student </div>
                    <div className='legend-item'><img src={Legend2} /> Teacher</div>
                </div>
                <ScoreWheel id='critical-wheel' score = {Number(critical)} teacher_score={Number(teacher_critical)}
                    title='CRITICAL' description='I give feedback about my work.' />
                <ScoreWheel id='creative-wheel' score = {Number(creative)} teacher_score={Number(teacher_creative)}
                    title='CREATIVE' description='I give feedback about my work.' />
                <ScoreWheel id='responsible-wheel' score = {Number(responsible)} teacher_score={Number(teacher_responsible)}
                    title='COMMUNICATION' description='I give feedback about my work.' />
            </React.Fragment>
        )
    }

    render() {
        const {teacher_critical, teacher_creative, teacher_responsible,
            critical, creative, responsible, userType} = this.props.entry;
        let wheels = null;
        if (userType === 1) {
            wheels = teacher_creative && teacher_critical && teacher_responsible ?
                this.renderScoreWheel(critical, creative, responsible,
                    teacher_critical, teacher_creative, teacher_responsible) : this.renderAssessmentWheel();
        } else { 
            wheels = this.renderScoreWheel(critical, creative, responsible,
                teacher_critical, teacher_creative, teacher_responsible)
        }
        return(
            <CardContent>
                <div>TEACHER TO PEER ASSESSMENT</div>
                <div className='assesssment-wheel-container'>
                    {wheels}
                </div>
                <Comments comments={this.props.feedback} />
                <EmojiInput placeholder='Give feedback...' onChange={this.onInputChange} clearEditor={false} />
                <button className='feedback-submit' onClick={this.submitComment}>Submit</button>
            </CardContent>
        )
    }
}


export default connect()(Assessment);
