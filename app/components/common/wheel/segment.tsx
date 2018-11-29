import React from 'react';

const radius = 100 / (2 * Math.PI);
const width = 42;
const center = {
  x: width / 2,
  y: width / 2,
};

interface ISegment {
	stroke: any;
	strokeDasharray: any;
	strokeDashoffset: any;
	strokeWidth: any;
	title: any;
	className: any;
	id: any;
}

const Segment: React.SFC<ISegment> = (props) => {
	const {stroke, strokeDasharray, strokeDashoffset, strokeWidth, title,
		className, id} = props;
	return (
		<circle
			className={className}
			cx={center.x}
			cy={center.y}
			r={radius}
			fill='none'
			id={id}
			stroke={stroke}
			strokeWidth={strokeWidth}
			strokeDasharray={strokeDasharray}
			strokeDashoffset={strokeDashoffset}
			style={{cursor: 'pointer'}}
		>
			{title && <title>{title}</title>}
		</circle>
	);
};

export default Segment;
