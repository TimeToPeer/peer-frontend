import React, {Component, ChangeEvent} from 'react';

import editInputSvg from 'Assets/images/editInput.svg';

interface IMyState { value: string; }
interface IMyProps { placeholder: string; value: string; onChange(val: string): void; }

class AccountInput extends Component<IMyProps, IMyState> {
	constructor(props: any) {
		super(props);
		this.state = {
			value: props.value || '',
		};

		this.onChangeInput = this.onChangeInput.bind(this);
	}

	onChangeInput(event: React.FormEvent<HTMLInputElement>) {
		this.setState({value: event.currentTarget.value});
		this.props.onChange(event.currentTarget.value);
	}

	render() {
		return (
			<div className='account-input-field'>
				<img src={editInputSvg} />
				<input value={this.state.value} onChange={this.onChangeInput} placeholder={this.props.placeholder} />
			</div>
		);
	}
}

export default AccountInput;
