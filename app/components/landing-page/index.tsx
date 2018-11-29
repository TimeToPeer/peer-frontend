import React, {Component, Fragment} from 'react';
import landingImg from 'Assets/images/landing.png';
import questImg from 'Assets/images/quest.png';
import postImg from 'Assets/images/post.png';
import peersImg from 'Assets/images/peers.png';
import skillsImg from 'Assets/images/skills.png';
import classImg from 'Assets/images/class.png';
import constants from 'Constants/constants';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

interface IMyState { feature: string; }
interface IMyProps { dispatch: any; loggedIn: boolean; history: any; }

class LandingPage extends Component<IMyProps, IMyState> {
	constructor(props: any) {
		super(props);
		this.state = {
			feature: 'quest',
		};
		this.onFeatureClick = this.onFeatureClick.bind(this);
	}

	renderFeatureContent(target: string) {
		const targetId = target.toUpperCase();
		const title = (constants as any)[targetId];
		const text = (constants as any)[targetId + '_DESCRIPTION'];

		return (
			<div className='feature-content'>
				<div className='feature-title'>{title.toUpperCase()}</div>
				<div className='feature-text'>{text}</div>
			</div>
		);
	}

	componentDidMount() {
		document.body.style.backgroundColor = 'white';
	}

	componentWillUnmount() {
		document.body.style.backgroundColor = null;
	}

	onFeatureClick(event: any) {
		this.setState({ feature: event.target.id });
	}

	render() {
		const { feature } = this.state;
		const containerClass = `feature-container ${feature}`;
		if (this.props.loggedIn) {
			return (
				<Redirect to='/dashboard' />
			);
		}

		return(
			<div className='container'>
				<div className='landing-container'>
					<div className='title'>WELCOME TO PEER</div>
					<img className='landing-img' src={landingImg} />
					<div className='description-header'>A META-LEARNING EXPERIENCE</div>
					<div className='description-text'>
						PEERS follows an intuitive education process that meets the learning needs, interests,
						and aspirations of all students.
						PEER provides students a platform to engage as digital citizens in meaningful, positive ways.
					</div>
					<div className={containerClass}>
						<div className='feature-row'>
							<div className='item'>
								<img src={questImg} id='quest' onClick={this.onFeatureClick} />
								<div className='item-text'>{constants.QUEST.toUpperCase()}</div>
							</div>
							<div className='item'>
								<img src={postImg} id='post' onClick={this.onFeatureClick} />
								<div className='item-text'>{constants.POST.toUpperCase()}</div>
							</div>
							<div className='item'>
								<img src={peersImg} id='peers' onClick={this.onFeatureClick}  />
								<div className='item-text'>{constants.PEERS.toUpperCase()}</div>
							</div>
							<div className='item'>
								<img src={skillsImg} id='skills' onClick={this.onFeatureClick}  />
								<div className='item-text'>{constants.SKILLS.toUpperCase()}</div>
							</div>
							<div className='item'>
								<img src={classImg} id='class' onClick={this.onFeatureClick} />
								<div className='item-text'>{constants.CLASS.toUpperCase()}</div>
							</div>
						</div>
						<div className='feature-content'>
							{this.renderFeatureContent(feature)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		loggedIn: state.authReducer.loggedIn,
	};
};

export default connect(mapStateToProps)(LandingPage);
