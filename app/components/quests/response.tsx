import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import MyImageEditor from 'Common/image-editor';
import Wheel from 'Common/wheel';
import CloseSvg from 'Assets/images/close.svg';
import OpenSvg from 'Assets/images/open.svg';
import { showLoading, submitQuest } from 'Actions/index';

interface IState { critical: number; creative: number; responsible: number; image: string; error: boolean; }
interface IProps { dispatch: any; questId: any; text: string; }

class QuestResponse extends Component<IProps, IState> {
	private assessment: any;
	constructor(props: any) {
		super(props);
		this.onWheelClick = this.onWheelClick.bind(this);
		this.openAssessment = this.openAssessment.bind(this);
		this.closeAssessment = this.closeAssessment.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.assessment = createRef();

		this.state = {
			critical: 0,
			creative: 0,
			responsible: 0,
			image: '',
			error: false,
		};
	}

	onWheelClick(id: string, val: string) {
		const target: string = id.substring(0, id.indexOf('-'));
		const valNum = Number(val) + 1;
		this.setState({ [target]: valNum } as any);
	}

	closeAssessment() {
		this.assessment.current.style.right = '-270px';
	}

	openAssessment() {
		this.assessment.current.style.right = '0';
	}

	onSubmit(imgVal: string, inputVal: string) {
		const { critical, creative, responsible } = this.state;
		const { questId } = this.props;
		if (critical < 1 || creative < 1 || responsible < 1 || inputVal.length === 0 || imgVal.length === 0) {
			if (critical < 1 || creative < 1 || responsible < 1 ) {
				this.assessment.current.style.right = '0';
			}
			this.setState({ error: true });
		} else if (critical > 0 && creative > 0 && responsible > 0 && inputVal.length > 0 && imgVal.length > 0) {
			this.setState({ error: false });
			this.props.dispatch(showLoading(true));
			this.props.dispatch(submitQuest({
				questId, entry: inputVal, imgVal, critical, creative, responsible,
			}));
		}
	}

	render() {
		return(
			<div className='response-container'>
				<MyImageEditor onSubmit={this.onSubmit} error={this.state.error} />
				<img className='open-assessment' src={OpenSvg} onClick={this.openAssessment} />
				<div className='assessment' ref={this.assessment}>
					<div className='heading-text'>
						{this.props.text}
					</div>
					<Wheel id='critical-wheel' onWheelClick={this.onWheelClick} type='student'
						title='CRITICAL' description='I can support my opinions with facts.' />
					<Wheel id='creative-wheel' onWheelClick={this.onWheelClick} type='student'
						title='CREATIVE' description={`I can build on other people's ideas.`}/>
					<Wheel id='responsible-wheel' onWheelClick={this.onWheelClick} type='student'
						title='COMMUNICATION' description='I can present information clearly.'/>
					<img className='close-assessment' src={CloseSvg} onClick={this.closeAssessment} />
				</div>
			</div>
		);
	}
}

export default connect()(QuestResponse);
