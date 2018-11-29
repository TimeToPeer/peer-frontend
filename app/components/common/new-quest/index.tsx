import React, {Component} from 'react';

interface IProps { id: string; title: string; fake?: boolean; }

class NewQuest extends Component<IProps, {}> {
	constructor(props: any) {
		super(props);
	}

	onClickHander() {
		if (!this.props.fake) {
			window.location.href = '/quest/' + this.props.id;
		}
	}

	render() {
		const fake = this.props.fake ? 'fake' : '';
		return (
			<div className={`new-quest-container ${fake}`} onClick={this.onClickHander.bind(this)}>
				<div className='new-quest'><div>You have a new QUEST!</div></div>
				<div className='quest-title'>{this.props.title.toUpperCase()}</div>
			</div>
		);
	}
}

export default NewQuest;
