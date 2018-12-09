import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getQuestEntry, getQuests, selectedQuestEntry, showLoading} from 'Actions/index';
import Feed from 'Common/feed';
import Classroom from 'Components/teacher/dashboard/classroom.tsx';

interface IProps { dispatch: any; match: any; entries: any; comments: any; feedback: any; quests: any; entryId: any; }
interface IState { entryId: string; showClassroom: boolean; }

class Assessment extends Component<IProps, IState> {
    static getDerivedStateFromProps(props: any, state: any) {
        if (props.selectedId !== undefined && props.selectedId !== state.entryId) {
            if (!props.pendingAssessment) {
                props.dispatch(showLoading(false));
            }
            return {
                showClassroom: false,
            }
        } else if (props.selectedId === undefined) {
            return {
                showClassroom: true,
            }
        }
        return {};
    }

    constructor(props: any) {
        super(props);
        const entryId = props.match ? props.match.params.id : props.entryId;
        const showClassroom = entryId ? false : true;
        this.state = {
            entryId,
            showClassroom,
            
        }
        this.goBackHandler = this.goBackHandler.bind(this);
    }

    goBackHandler() {
        this.props.dispatch(selectedQuestEntry(undefined));
    }

    componentDidMount() {
        this.props.dispatch(getQuests({}));
    }

    render() {
        if (this.props.entries.pending && this.props.quests.pending) {
            return <div></div>
        }
        const goback = '< Go back to classroom'
        return(
            <div className='assessment-container'>
                { this.state.showClassroom ? 
                    <Classroom inventory={this.props.quests.inventory} /> : 
                    <React.Fragment>
                        <div onClick={this.goBackHandler}>{goback}</div>
                        <Feed entries={this.props.entries} {...this.props.comments} disableComment={true} feedback={this.props.feedback}/> 
                    </React.Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        pendingAssessment: state.assessmentReducer.pending,
        quests: state.questsReducer,
        comments: state.commentsReducer,
        entries: state.entryReducer,
        feedback: state.assessmentReducer.feedback,
        selectedId: state.assessmentReducer.quest_entry_id,
    }
}

export default connect(mapStateToProps)(Assessment);
