import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import LandingPage from 'Components/landing-page';
import Dashboard from 'Components/dashboard';
import Quest from 'Components/quests';

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

const Main = () => {
	return <main>
		<Switch>
			<Route exact path='/' component={LandingPage}/>
			<PrivateRoute path='/dashboard' component={Dashboard} />
			<PrivateRoute path='/quest/:id' component={Quest} />
			<Route component={LandingPage} />
		</Switch>
	</main>;
};

export default Main;
