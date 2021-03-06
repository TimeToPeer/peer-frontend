import React, {Component, createRef} from 'react';
import Wheel from './wheel';
import Colors from 'Styles/colors.scss';

const dataPie = [
	{value: 12.5, stroke: `${Colors.hershey}`},
	{value: 12.5, stroke: `${Colors.hershey}`},
	{value: 12.5, stroke: `${Colors.hershey}`},
	{value: 12.5, stroke: `${Colors.hershey}`},
	{value: 12.5, stroke: `${Colors.hershey}`},
	{value: 12.5, stroke: `${Colors.hershey}`},
	{value: 12.5, stroke: `${Colors.hershey}`},
	{value: 12.5, stroke: `${Colors.hershey}`},
];

interface IProps { id: string; title: string; description: string;
	score: number; teacher_score: number; }

class Score extends Component<IProps, {}> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount() {
		const { score, id, teacher_score } = this.props;
		const rScore = Math.round(score);
		const rTeacherScore = Math.round(teacher_score);
		const wheelContainer = document.getElementById(id);
        const circle: any = wheelContainer.getElementsByClassName('circle-piece');
		for (let i = 0; i < rScore; i++) {
			circle[i].style.stroke = `${Colors.grape}`;
		}
		for (let i = rScore; i < 8; i++) {
			circle[i].style.stroke = `${Colors.hershey}`;
        }
        const teach_wheelContainer = document.getElementById(id+'-teacher');
        const teach_circle: any = teach_wheelContainer.getElementsByClassName('circle-piece');
		for (let i = 0; i < rTeacherScore; i++) {
			teach_circle[i].style.stroke = `${Colors.sour}`;
		}
		for (let i = rTeacherScore; i < 8; i++) {
			teach_circle[i].style.stroke = `${Colors.hershey}`;
		}
	}

	render() {
		const {id, title, description} = this.props;
		return(
            <div className='score-container'>
				{title}
				<div className='description'>
					<p>{description}</p>
				</div>
                <div className='combine-wheel'>
                    <div className='wheel-container student' id={id}>
                        <Wheel data={dataPie}  spacing={1} svgWidth={200} strokeWidth={4} />
                    </div>
                    <div className='wheel-container' id={`${id}-teacher`}>
                        <Wheel data={dataPie}  spacing={1} svgWidth={280} strokeWidth={4} />
                    </div>
                </div>
            </div>
		);
	}
}

export default Score;
