import React from 'react';
import Segment from './segment';

const width = 42;

interface IWheel {
	data: any;
	spacing: number;
	svgWidth: number;
	strokeWidth: number;
}

const Wheel: React.SFC<IWheel> = (props) => {
	const { data, spacing, svgWidth, strokeWidth } = props;
	const total = data.reduce((prev: any, current: any) => current.value + prev, 0);
	let percentAcc = 0;
	let totalStroke = 25;
	return (
		<svg width={svgWidth} viewBox={`0 0 ${width} ${width}`}>
			<circle
				className='boundzone'
				cx='21'
				cy='21'
				r='12.91594309189533'
				stroke='black'
				strokeWidth='2'
				fill='none'
				style={{stroke: 'transparent'}}
			></circle>
			<circle
				className='boundzone'
				cx='21'
				cy='21'
				r='18.91594309189533'
				stroke='black'
				strokeWidth='2'
				fill='none'
				style={{stroke: 'transparent'}}
			></circle>
			{data.map((d: any, i: any) => {
				const percent = d.value / Math.ceil(total) * 100;
				const DashArrayPercent =
					spacing < 0 || percent - spacing < 0 ? percent : percent - spacing;
				const DashArraylength =
					spacing < 0 || percent + spacing > 100
						? 100 - percent
						: 100 - percent + spacing;
				const strokeDasharray = `${DashArrayPercent} ${DashArraylength}`;
				const strokeDashoffset = i === 25 ? 0 : totalStroke - percentAcc;
				percentAcc += percent;
				if (strokeDashoffset === 0) {
						totalStroke = total;
						percentAcc = d.value;
				}
				return (
					percent > 0 && (
						<Segment
							key={i}
							id={i}
							className='circle-piece'
							strokeDasharray={strokeDasharray}
							strokeDashoffset={strokeDashoffset}
							strokeWidth={strokeWidth}
							{...d}
						/>
					)
				);
			})}
		</svg>
	);
};

export default Wheel;
