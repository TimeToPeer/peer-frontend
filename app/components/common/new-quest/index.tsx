import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {imageUrl} from 'Helpers/main-helper';
import NewQuestSvg from 'Assets/images/newquest.svg';

const styles = () => ({
	'avatar-icon': {
		fontFamily: 'JosefinRegular, Arial',
		cursor: 'pointer',
		fontSize: '10pt',
		color: 'black',
		width: '151px',
		height: '151px',
		textAlign: 'center' as 'center',
	},
	'avatar-icon-container': {
		display: 'inline-block',
		verticalAlign: 'top',
	},
});

interface IProps { id: string; title: string; fake?: boolean; text?: string; image: string;
	hoverText: string; classes: any; color?: any; onClickHandler?(id: string): void; hideButton: boolean;}
interface IState { overText: string; hover: boolean; }

class NewQuest extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			overText: this.props.text,
			hover: false,
		}
		this.onClickHandler = this.onClickHandler.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.createNewResponse = this.createNewResponse.bind(this);
	}

	onClickHandler(id: string) {
		if (this.props.onClickHandler) this.props.onClickHandler(id);
	}

	onMouseOver() {
		this.setState({hover: true, overText: this.props.hoverText});
	}

	onMouseOut() {
		this.setState({hover: false, overText: this.props.text});
	}

	createNewResponse(e: any) {
		e.preventDefault();
		e.stopPropagation()
		window.location.href = '/quest/' + this.props.id;
	}

	render() {
		const fake = this.props.fake ? 'fake' : '';
		const { id, title, image, classes, color, hideButton } = this.props;
		const bgColor = color ? color : 'white';
		const imageHov = image ? imageUrl(image) : '';
		return (
			<div className={`new-quest-container ${fake}`} onClick={() => this.onClickHandler(id)}>
				<Avatar aria-label='Avatar' className={classnames(classes['avatar-icon'], bgColor)} src={!this.state.hover ? imageHov : ''}
					onMouseOver={this.onMouseOver}
					onMouseLeave={this.onMouseOut}>
					{this.state.overText}
				</Avatar>
				{fake || hideButton? '' : <img className='new-quest-button' src={NewQuestSvg} onClick={this.createNewResponse} />}
				<div className='quest-title'>{title ? title.toUpperCase() : '' }</div>
			</div>
		);
	}
}

export default withStyles(styles)(NewQuest);
