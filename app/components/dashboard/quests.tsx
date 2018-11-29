import React, {Component} from 'react';
import AssessSvg from 'Assets/images/logo.png';
import Modal from 'react-modal';
import AssessedWheel from 'Common/wheel/assessed';

interface IProps { entries: any; }
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
		entries.forEach((item: any) => {
			const entry = (
				<div className='quest-entries-container' key={item.id}>
					<div className='cont'>
						<div className='entry-image-container'>
							<img className='entry-img' src={item.image} />
						</div>
						<div className='entry-text'>{item.entry}</div>
						<div className='assessment' onClick={() => this.openModal(item)}><img className='assessment-img' src={AssessSvg} /></div>
					</div>
				</div>
			);
			entryArr.push(entry);
		});
		return entryArr;
	}

	render() {
		const { entries } = this.props.entries;
		const { critical, creative, responsible } = this.state;
		return (
			<div className='quest-entries-col-container'>
				{this.renderQuests(entries)}
				<Modal
					className='assess-modal'
					isOpen={this.state.isOpen}
					onRequestClose={this.closeModal}
					ariaHideApp={false}
				>
					<div className='assesssed-container'>
						<AssessedWheel id='critical-wheel' score = {Number(critical)}
							title='CRITICAL' description='I give feedback about my work.' />
						<AssessedWheel id='creative-wheel' score = {Number(creative)}
							title='CREATIVE' description='I give feedback about my work.' />
						<AssessedWheel id='responsible-wheel' score = {Number(responsible)}
							title='RESPONSIBLE' description='I give feedback about my work.' />
					</div>
				</Modal>
			</div>
		);
	}
}

export default Quests;
