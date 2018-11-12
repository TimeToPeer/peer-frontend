import React, {Component} from 'react';
import logo from 'Assets/images/logo.png';

class NavBar extends Component{
	constructor(props: object){
		super(props);
	}
	render(){
		return(
			<div className='menu-container'>
                <div className='logo-container'>
                    <div className='image'>
						<img src={logo}/>
					</div>
                    <div className='logo-name'>PEER</div>
                </div>
				<div className='signin'>SIGN IN</div>
			</div>
		)
	}
}

export default NavBar;