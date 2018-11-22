import React, {Component} from 'react';
import Hover1 from 'Assets/images/hover1.png';
import Hover2 from 'Assets/images/hover2.png';
import Hover3 from 'Assets/images/hover3.png';

class Menu extends Component<{}, {}> {
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
	}

	render() {
		return (
			<div className='info-container'>
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
				<div className='peers-info'>
					<span
						onMouseOver={this.handleMouseOver.bind(this)}
						onMouseOut={this.handleMouseOut.bind(this)}
						onClick={this.handleOnClick}
						id='peers-spanmenuitem'
						className='selected'
					>
						PEERS
						<img src={Hover2} />
					</span>
				</div>
				<div className='skills-info'>
					<span
						onMouseOver={this.handleMouseOver.bind(this)}
						onMouseOut={this.handleMouseOut.bind(this)}
						onClick={this.handleOnClick}
						id='skills-spanmenuitem'
					>
						PEERS
						<img src={Hover3} />
					</span>
				</div>
			</div>
		);
	}
}

export default Menu;
