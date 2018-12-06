import React, {Component, ChangeEvent} from 'react';

interface IMyState { value: string; }
interface IMyProps { placeholder: string; svg: any; }

class AccountButton extends Component<IMyProps, IMyState> {
	constructor(props: any) {
		super(props);
		this.state = {
			value: props.value || '',
		};
	}

	render() {
		return (
			<div className='account-button-container'>
				<button className='account-button'>
                    <span className={'account-button-placeholder'}>{this.props.placeholder}</span>
                    <img src={this.props.svg} />
                </button>
			</div>
		);
	}
}

export default AccountButton;
