import React, {Component, Fragment} from 'react';
import NavBar from 'Components/nav-bar';
import landingImg from 'Assets/images/landing.png';
import questImg from 'Assets/images/quest.png';
import postImg from 'Assets/images/post.png';
import peersImg from 'Assets/images/peers.png';
import skillsImg from 'Assets/images/skills.png';
import classImg from 'Assets/images/class.png';
import constants from 'Constants/constants'

type MyProps = {};
type MyState = { feature: string, loading: boolean};

class LandingPage extends Component<MyProps, MyState>{
	constructor(props: object){
		super(props);
		this.state = {
			feature: 'quest',
			loading: true,
		}

		this.onFeatureClick = this.onFeatureClick.bind(this);
	}

	renderFeatureContent (target: string) {
		let targetId = target.toUpperCase();
		let title = (constants as any)[targetId];
		let text = (constants as any)[targetId + '_DESCRIPTION'];

		return (
			<div className='feature-content'>
				<div className='feature-title'>{title.toUpperCase()}</div>
				<div className='feature-text'>{text}</div>
			</div>
		);
	}

	onFeatureClick (event: any) {
		this.setState({ feature: event.target.id })
	}

	loadShit(){
		this.setState({ loading: false });
	}

	render(){
		const { feature, loading } = this.state;
		const containerClass = `feature-container ${feature}`;
		const isLoading = loading ? 'isLoading' : '';

		return(
			<div className={`container ${loading}`}>
				<NavBar />
				<div className='landing-container'>
					<div className='title'>WELCOME TO PEER</div>
					<img className='landing-img' src={landingImg} onLoad={this.loadShit.bind(this)}/>
					<div className='description-header'>A META-LEARNING EXPERIENCE</div>
					<div className='description-text'>PEERS follows an intuitive education process that meets the learning needs, interests, and aspirations of all students.
						PEER provides students a platform to engage as digital citizens in meaningful, positive ways.
					</div>
					<div className={containerClass}>
						<div className='feature-row'>
							<div className='item'>
								<img src={questImg} id='quest' onClick={this.onFeatureClick} />
								<div>{constants.QUEST.toUpperCase()}</div>
							</div>
							<div className='item'>
								<img src={postImg} id='post' onClick={this.onFeatureClick} />
								<div>{constants.POST.toUpperCase()}</div>
							</div>
							<div className='item'>
								<img src={peersImg} id='peers' onClick={this.onFeatureClick}  />
								<div>{constants.PEERS.toUpperCase()}</div>
							</div>
							<div className='item'>
								<img src={skillsImg} id='skills' onClick={this.onFeatureClick}  />
								<div>{constants.SKILLS.toUpperCase()}</div>
							</div>
							<div className='item'>
								<img src={classImg} id='class' onClick={this.onFeatureClick} />
								<div>{constants.CLASS.toUpperCase()}</div>
							</div>
						</div>
						<div className='feature-content'>
							{this.renderFeatureContent(feature)}
						</div>
					</div>

					<div className='footer'>
						SIGN ME UP
					</div>
				</div>
			</div>
		)
	}
}

export default LandingPage;