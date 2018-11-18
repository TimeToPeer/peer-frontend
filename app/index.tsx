/// <reference path='./references/index.d.ts'/>
import './index';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'Components/main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import 'Styles/index.scss';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Main />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);
