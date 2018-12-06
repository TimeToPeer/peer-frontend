import React, {Component, createRef} from 'react';
import Wheel from './wheel';

const dataPie = [
	{value: 12.5, stroke: '#eae8e3'},
	{value: 12.5, stroke: '#eae8e3'},
	{value: 12.5, stroke: '#eae8e3'},
	{value: 12.5, stroke: '#eae8e3'},
	{value: 12.5, stroke: '#eae8e3'},
	{value: 12.5, stroke: '#eae8e3'},
	{value: 12.5, stroke: '#eae8e3'},
	{value: 12.5, stroke: '#eae8e3'},
];

interface IProps { id: string; title: string; description: string; type: string, onWheelClick(id: string, val: string): void; }
class WheelComponent extends Component<IProps, {}> {
	stroke: any;
	constructor(props: any) {
		super(props);
		this.addBoundMouseOutEvent = this.addBoundMouseOutEvent.bind(this);
		this.addMouseOverEvent = this.addMouseOverEvent.bind(this);
		this.stroke = this.props.type === 'teacher' ? '#dfe8d3' : '#fee8ef';
	}

	addBoundMouseOutEvent(event: any) {
		const wheelContainer = document.getElementById(this.props.id);
		const circle: any = wheelContainer.querySelectorAll('.circle-piece:not(.selected)' );

		for (const c of circle) {
			c.style.stroke = '#eae8e3';
		}
	}

	addMouseOverEvent(event: any) {
		const wheelContainer = document.getElementById(this.props.id);
		const circle: any = wheelContainer.getElementsByClassName('circle-piece');
		const targetId =  event.srcElement.id;
		for (let i = 0; i <= targetId; i++) {
			circle[i].style.stroke = this.stroke;
		}
		const sup = Number(targetId) + 1;
		for (let j = sup; j < 8; j++) {
			circle[j].style.stroke = '#eae8e3';
		}
	}

	componentDidMount() {
		const wheelContainer = document.getElementById(this.props.id);
		const bound: any = wheelContainer.getElementsByClassName('boundzone');
		const circle: any = wheelContainer.getElementsByClassName('circle-piece');
		for (const b of bound) {
			b.addEventListener('mouseleave', this.addBoundMouseOutEvent);
		}

		for (const item of circle) {
			item.addEventListener('mouseover', this.addMouseOverEvent);
			item.addEventListener('click', (e: any) => {
				const targetId =  e.srcElement.id;
				for (let i = 0; i <= targetId; i++) {
					circle[i].style.stroke = this.stroke;
					circle[i].classList.add('selected');
					circle[i].removeEventListener('mouseover', this.addMouseOverEvent);
				}
				for (let i = Number(targetId) + 1; i < 8; i++) {
					circle[i].style.stroke = '#eae8e3';
					circle[i].classList.remove('selected');
					circle[i].addEventListener('mouseover', this.addMouseOverEvent);
				}
				this.props.onWheelClick(this.props.id, targetId);
			});
		}
	}

	componentWillUnmount() {
		const wheelContainer = document.getElementById(this.props.id);
		const bound: any = wheelContainer.getElementsByClassName('boundzone');
		const circle: any = wheelContainer.getElementsByClassName('circle-piece');
		for (const b of bound) {
			b.removeEventListener('mouseleave', this.addBoundMouseOutEvent);
		}
		for (const c of circle) {
			c.removeEventListener('mouseover', this.addMouseOverEvent);
			c.removeEventListener('click', {});
		}
	}

	render() {
		const {id, title, description} = this.props;
		return(
			<div className='wheel-container' id={id}>
				<div className='text-container'>
					<p>{title}<br/>{description}</p>
				</div>
				<Wheel data={dataPie}  spacing={1} svgWidth={225} strokeWidth={4} />
			</div>
		);
	}
}

export default WheelComponent;
