/// <reference path='./index.d.ts'/>
import './index';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'Components/main';
import { HashRouter } from 'react-router-dom';

import 'Styles/index.scss';

ReactDOM.render(
	<HashRouter>
		<Main />
	</HashRouter>,
	document.getElementById('root'),
);
