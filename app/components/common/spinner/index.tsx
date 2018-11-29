import React, {Component, createRef} from 'react';
import { connect } from 'react-redux';
import SpinnerSvg from 'Assets/images/spinner.svg';

interface IProps { isLoading: boolean; }

class Spinner extends Component<IProps, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const showLoading = this.props.isLoading ? 'show' : '';
		return (
			<div className={`spinner-container ${showLoading}`}>
				<img src={SpinnerSvg} />
			</div>
		);
	}
}

const mapStateToProps = (state: any, ownProps: any) => {
	return {
		isLoading: state.loadingReducer.isLoading,
	};
};

export default connect(mapStateToProps)(Spinner);
