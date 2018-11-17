/// <reference path='./index.d.ts'/>
import './index';
import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from 'Components/landing-page';

import 'Styles/index.scss';

ReactDOM.render(
	<LandingPage />,
	document.getElementById('root'),
);
