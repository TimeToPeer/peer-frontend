import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getQuestEntry} from 'Actions/index';
import Feed from 'Common/feed';

interface IProps { dispatch: any; entries: any; comments: any; feedback: any; entryId: any; }
interface IState { entryId: string; }

class Assessment extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        const entryId = props.entryId;

        this.state = {
            entryId,
        }
    }

    componentDidMount() {
        this.props.dispatch(getQuestEntry({entryId: this.state.entryId}));
    }

    render() {
        if (this.props.entries.pending) {
            return <div></div>
        }
        return(
            <div className='assessment-container'>
                <Feed entries={this.props.entries} {...this.props.comments} disableComment={true} feedback={this.props.feedback}/>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        comments: state.commentsReducer,
        entries: state.entryReducer,
        feedback: state.assessmentReducer.feedback,
    }
}

export default connect(mapStateToProps)(Assessment);
