import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from 'Components/landing-page';
import Dashboard from 'Components/dashboard';

const Main = () => (
  <main>
	<Switch>
	  <Route exact path='/' component={LandingPage}/>
	  <Route path='/dashboard' component={Dashboard}/>
	</Switch>
  </main>
);

export default Main;
