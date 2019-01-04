import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import MyImageEditor from 'Common/image-editor';
import Wheel from 'Common/wheel';
import EmojiInput from 'Common/inputs/emoji-input';
import { showLoading, submitQuest } from 'Actions/index';

interface IState { critical: number; creative: number; responsible: number; image: string; error: boolean; caption: string; }
interface IProps { dispatch: any; questId: any; text: string; }

class QuestResponse extends Component<IProps, IState> {
	private assessment: any;
	constructor(props: any) {
		super(props);
		this.onWheelClick = this.onWheelClick.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onImageSave = this.onImageSave.bind(this);
		this.onInputChange = this.onInputChange.bind(this);

		this.assessment = createRef();

		this.state = {
			critical: 0,
			creative: 0,
			responsible: 0,
			image: '',
			error: false,
			caption: '',
		};
	}

	onWheelClick(id: string, val: string) {
		const target: string = id.substring(0, id.indexOf('-'));
		const valNum = Number(val) + 1;
		this.setState({ [target]: valNum } as any);
	}

	onImageSave(canvas64: string) {
		this.setState({image: canvas64});
	}

	onSubmit() {
		const { critical, creative, responsible, caption, image } = this.state;
		if (!critical || !creative || !responsible || !caption || !image ) {
			return;
		}
		const { questId } = this.props;
		if (critical < 1 || creative < 1 || responsible < 1 || caption.length === 0 || image.length === 0) {
			if (critical < 1 || creative < 1 || responsible < 1 ) {
				this.assessment.current.style.right = '0';
			}
			this.setState({ error: true });
		} else if (critical > 0 && creative > 0 && responsible > 0 && caption.length > 0 && image.length > 0) {
			this.setState({ error: false });
			this.props.dispatch(showLoading(true));
			this.props.dispatch(submitQuest({
				questId, entry: caption, imgVal: image, critical, creative, responsible,
			}));
		}
	}

	onInputChange(val: string) {
		this.setState({ caption: val });
	}

	render() {
		const { image, caption, critical, responsible, creative } = this.state;
		const hasAssessment = critical && responsible && creative;
		const metRequirement = image && caption && hasAssessment;
		return(
			<div className='response-container'>
				<div className='response-status'>
					<div className='response-title'>QUEST goes here...</div>
					<ul className="progressbar">
						<li className={image ? 'active' : ''}><span>SHOW</span></li>
						<li className={caption ? 'active' : ''}>EXPLAIN</li>
						<li className={hasAssessment ? 'active' : ''}>ASSESS</li>
						<li className={metRequirement ? 'active' : ''} onClick={this.onSubmit}></li>
					</ul>
				</div>
				<div className='image-editor'>
					<MyImageEditor onImageSave={this.onImageSave} error={this.state.error} />
					<div className='caption-input'>
						<EmojiInput placeholder='Write your thoughts here...' onChange={this.onInputChange} clearEditor={false} />
					</div>
				</div>
				<div className='assessment' ref={this.assessment}>
					<Wheel id='critical-wheel' onWheelClick={this.onWheelClick} type='student'
						title='CRITICAL' description='I can support my opinions with facts.' />
					<Wheel id='creative-wheel' onWheelClick={this.onWheelClick} type='student'
						title='CREATIVE' description={`I can build on other people's ideas.`}/>
					<Wheel id='responsible-wheel' onWheelClick={this.onWheelClick} type='student'
						title='COMMUNICATION' description='I can present information clearly.'/>
				</div>
				{/* <div className='footer'>
					<div className='error-msg'>{ this.props.error ? 'You must include image, caption and self assessment' : ''}</div>
					<div className='error-msg'>{ this.state.imgError ? 'Url blocked. Please either try another image or upload image from computer' : ''}</div>
					<div className='button-container'>
						<button>SAVE</button>
						<button onClick={this.saveImage}>POST</button>
					</div>
				</div> */}
			</div>
		);
	}
}

export default connect()(QuestResponse);
