import React, {Component, createRef} from 'react';
import Wheel from './wheel';
import ReactDOM from 'react-dom';

const dataPie = [
	{value: 12.5, stroke: '#f8e8fb'},
	{value: 12.5, stroke: '#f8e8fb'},
	{value: 12.5, stroke: '#f8e8fb'},
	{value: 12.5, stroke: '#f8e8fb'},
	{value: 12.5, stroke: '#f8e8fb'},
	{value: 12.5, stroke: '#f8e8fb'},
	{value: 12.5, stroke: '#f8e8fb'},
	{value: 12.5, stroke: '#f8e8fb'},
];

interface IProps { id: string; title: string; description: string;
	score: number; }

class WheelComponent extends Component<IProps, {}> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		const { score, id } = this.props;
		const wheelContainer = document.getElementById(id);
		const circle: any = wheelContainer.getElementsByClassName('circle-piece');
		for (let i = 0; i < score; i++) {
			circle[i].style.stroke = '#fee8ef';
		}
		for (let i = score; i < 8; i++) {
			circle[i].style.stroke = '#f8e8fb';
		}
	}

	render() {
		const {id, title, description} = this.props;
		return(
			<div className='wheel-container' id={id}>
				<div className='text-container'>
					<p>{title}<br/>{description}</p>
				</div>
				<Wheel data={dataPie}  spacing={1} svgWidth={280} strokeWidth={4} />
			</div>
		);
	}
}

export default WheelComponent;
