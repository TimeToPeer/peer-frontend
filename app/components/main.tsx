import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import LandingPage from 'Components/landing-page';
import Dashboard from 'Components/dashboard';
import Quest from 'Components/quests';
import Spinner from 'Common/spinner';
import NavBar from 'Common/nav-bar';
import Assessment from 'Components/assessment.tsx';
import ScrollUpSvg from 'Assets/images/up.svg';

function PrivateRoute({ component: Component, ...rest }: any) {
	const session = localStorage.getItem('key');
	return (
		<Route
		{...rest}
		render={(props) =>
			session ? (
			<Component {...props} />
			) : (
			<Redirect
				to={{
				pathname: '/',
				state: { from: props.location },
				}}
			/>
			)
		}
		/>
	);
}

function scrollTop() {
	document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const Main = () => {
	return (
		<main>
			<Spinner />
			<NavBar />
			<div className='container'>
				<Switch>
					<Route exact path='/' component={LandingPage}/>
					<PrivateRoute path='/dashboard' component={Dashboard} />
					<PrivateRoute path='/quest/:id' component={Quest} />
					<PrivateRoute path='/assessment/:id?' component={Assessment} />
					<Route component={LandingPage} />
				</Switch>
			</div>
			<img id="scrollUpBtn" className='scroll-up-button' src={ScrollUpSvg} onClick={scrollTop} />
		</main>
	);
};


export default Main;
