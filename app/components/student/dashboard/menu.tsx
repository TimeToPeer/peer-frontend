import React, {Component} from 'react';
import Hover1 from 'Assets/images/hover1.png';
import Hover2 from 'Assets/images/hover2.png';
import Hover3 from 'Assets/images/hover3.png';
import Grid from '@material-ui/core/Grid';


interface IProps { isTeacher?: boolean; current: string; handleMenuClick?(id: string): void; }

class Menu extends Component<IProps, {}> {
	constructor(props: any) {
		super(props);

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	handleMouseOver(event: any) {
		const img = event.target.parentElement.getElementsByTagName('img');
		img[0].style.display = 'block';
	}

	handleMouseOut(event: any) {
		const img = event.target.parentElement.getElementsByTagName('img');
		img[0].style.display = 'none';
	}

	handleOnClick(event: any) {
		const thisEl = event.target;
		document.getElementById('quest-spanmenuitem').classList.remove('selected');
		document.getElementById('peers-spanmenuitem').classList.remove('selected');
		document.getElementById('skills-spanmenuitem').classList.remove('selected');
		thisEl.classList.add('selected');
		if (this.props.handleMenuClick) {
			this.props.handleMenuClick(thisEl.id);
		}
	}

	componentDidMount() {
		const el = document.getElementById(this.props.current);
		el.classList.add('selected');
	}

	render() {
		return (
			<Grid container spacing={24} className='info-container' justify='space-around'>
				<Grid item sm={4} xs={12}>
					<div className='quests-info'>
						<span
							onMouseOver={this.handleMouseOver.bind(this)}
							onMouseOut={this.handleMouseOut.bind(this)}
							onClick={this.handleOnClick}
							id='quest-spanmenuitem'
						>
							QUESTS
							<img src={Hover1} />
						</span>
					</div>
				</Grid>
				<Grid item sm={4} xs={12}>
					<div className='peers-info'>
						<span
							onMouseOver={this.handleMouseOver.bind(this)}
							onMouseOut={this.handleMouseOut.bind(this)}
							onClick={this.handleOnClick}
							id='peers-spanmenuitem'
						>
							PEERS
							<img src={Hover2} />
						</span>
					</div>
				</Grid>
				<Grid item sm={4} xs={12}>
					<div className='skills-info'>
						<span
							onMouseOver={this.handleMouseOver.bind(this)}
							onMouseOut={this.handleMouseOut.bind(this)}
							onClick={this.handleOnClick}
							id='skills-spanmenuitem'
						>
							{this.props.isTeacher ? 'CLASSROOM' : 'SKILLS' }
							<img src={Hover3} />
						</span>
					</div>
				</Grid>
			</Grid>
		);
	}
}

export default Menu;
