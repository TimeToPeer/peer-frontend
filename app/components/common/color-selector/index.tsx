import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import {mapIdToColor} from 'Helpers/main-helper';

interface IProps { userColor: number; onChangeIcon: any; }
interface IState { open: boolean; }

class PopupPicker extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			open: false,
		};

		this.onClickHandler = this.onClickHandler.bind(this);
	}

	onClickHandler(event: any) {
		const intIcon = Number(event.target.id);
		this.setState({open: false});
		this.props.onChangeIcon(intIcon);
	}

	openPopup() {
		this.setState({ open: true });
	}

	shouldComponentUpdate(nextProps: any, nextState: any) {
		if (nextProps.userColor !== this.props.userColor ||
			nextState.open !== this.state.open) {
			return true;
		}

		return false;
	}

	render() {
		const { userColor } = this.props;
		const colorString = mapIdToColor(userColor);
		return (
			<div className='popup-container'>
				<Popup
					trigger={
						<div className='popup-trigger-btn'>
							STUDENT ICON
							<div className={`color-selection ${colorString}`}></div>
						</div>
					}
					position='top center'
					open={this.state.open}
					onOpen={this.openPopup.bind(this)}
				>
					<div>
						<div className='color-choice-row'>
							<div id='0' className='color-choice caramel' onClick={this.onClickHandler.bind(this)}></div>
							<div id ='1' className='color-choice salt' onClick={this.onClickHandler.bind(this)}></div>
							<div id ='2' className='color-choice grape' onClick={this.onClickHandler.bind(this)}></div>
							<div id ='3' className='color-choice bubble' onClick={this.onClickHandler.bind(this)}></div>
						</div>
						<div className='color-choice-row'>
							<div id ='4' className='color-choice hershey' onClick={this.onClickHandler.bind(this)}></div>
							<div id ='5' className='color-choice sour' onClick={this.onClickHandler.bind(this)}></div>
							<div id ='6' className='color-choice peach' onClick={this.onClickHandler.bind(this)}></div>
							<div id ='7' className='color-choice lemon' onClick={this.onClickHandler.bind(this)}></div>
						</div>
					</div>
				</Popup>
			</div>
		);
	}
}

export default PopupPicker;
