import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import ScoreWheel from 'Common/wheel/score'
import classnames from 'classnames';
import Legend1 from 'Assets/images/hover4.png';
import Legend2 from 'Assets/images/hover3.png';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Comments from 'Common/comment';
import { selectedQuestEntry, getQuestEntry, showLoading, pendingAssessment } from 'Actions/index';
import Colors from 'Styles/colors.scss';

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)
 
// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

const styles = () => ({
    exp: {
        transition:'height 100ms ease-out',
        height: '0px',
        
    },
    expandOpen: {
        height: '100%',
    },
    contentHide: {
        display: 'none',
    },
    contentShow: {
        display: 'table-cell',
        textAlign: 'center' as 'center',
    },
    row: {
        '&:hover': {
            backgroundColor: `${Colors.lemon}`,
        }
    },
    selected: {
        backgroundColor:  `${Colors.lemon}`,
    },
    cursor: {
        cursor: 'pointer',
        userSelect: 'none' as 'none',
    },
    comments: {
        textAlign: 'left' as 'left',
    }
});

interface IState { openAssessment: any; openComments: any; }
interface IProps { row: any; classes: any; dispatch: any; }

class Row extends Component<IProps, IState> {
    constructor (props: any) {
        super(props);
        this.state = {
            openComments: false,
            openAssessment: false,
        }
        this.openAssessment = this.openAssessment.bind(this);
        this.openComments = this.openComments.bind(this);
        this.renderAssessment = this.renderAssessment.bind(this);
        this.clickToFeedback = this.clickToFeedback.bind(this);
    }

    openAssessment() {
        this.setState({openAssessment: !this.state.openAssessment});
    }

    openComments() {
        this.setState({openComments: !this.state.openComments});
    }

    renderScoreWheel(id: string, critical: string, creative: string, responsible: string, teacher_critical: string, teacher_creative: string, teacher_responsible: string) {
        return (
            <React.Fragment>
                <div className='legend'>
                    <div className='legend-item'><img src={Legend1} /> Student </div>
                    <div className='legend-item'><img src={Legend2} /> Teacher</div>
                </div>
                <ScoreWheel id={`critical-wheel-${id}`} score = {Number(critical)} teacher_score={Number(teacher_critical)}
                    title='CRITICAL' description='I give feedback about my work.' />
                <ScoreWheel id={`creative-wheel-${id}`} score = {Number(creative)} teacher_score={Number(teacher_creative)}
                    title='CREATIVE' description='I give feedback about my work.' />
                <ScoreWheel id={`responsible-wheel-${id}`} score = {Number(responsible)} teacher_score={Number(teacher_responsible)}
                    title='COMMUNICATION' description='I can present information clearly.' />
            </React.Fragment>
        )
    }
    renderAssessment() {
        const {classes, row } = this.props;
        const openAssessRow = this.state.openAssessment ? 'expandOpen' : '';
        const showAssessCell = this.state.openAssessment ? 'contentShow' : 'contentHide';
        return (
            <TableRow className={classnames(classes.exp, classes[openAssessRow])}>
                <TableCell colSpan={5} className={classes[showAssessCell]}>
                    <div className='assessment-container table-row'>
                        <div className='assesssment-wheel-container'>
                            {
                                this.renderScoreWheel(row.id, row.assessed.critical, row.assessed.creative,
                                    row.assessed.responsible, row.assessed.teacher_critical,
                                    row.assessed.teacher_creative, row.assessed.teacher_responsible)
                                
                            }
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        )
    }

    clickToFeedback() {
        const { row, dispatch } = this.props;
        dispatch(showLoading(true));
        dispatch(selectedQuestEntry(row.feedback.quest_entry_id));
        dispatch(getQuestEntry({entryId: row.feedback.quest_entry_id}));
        dispatch(pendingAssessment());
    }

    render() {
        const { row, classes } = this.props;
        const openCommentRow = this.state.openComments ? 'expandOpen' : '';
        const showCommentCell = this.state.openComments ? 'contentShow' : 'contentHide';
        const assessment = this.renderAssessment();
        const comments = (
            <TableRow className={classnames(classes.exp, classes[openCommentRow], classes.comments)}>
              <TableCell colSpan={5} className={classnames(classes[showCommentCell], classes.comments)}>
                {row.comments.length > 0 ? <Comments comments={row.comments} /> : 'No comments...' }
              </TableCell>
            </TableRow>
        );
        const selected = this.state.openAssessment || this.state.openComments ? 'selected' : '';
        return (
            <React.Fragment>
                <TableRow className={classnames(classes.row, classes[selected])}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell numeric>{row.posts}</TableCell>
                    <TableCell numeric  onClick={this.openAssessment} className={classes.cursor}>
                        {
                            row.assessed.post_count ? `Assessed ${row.assessed.assessed_count} / ${row.assessed.post_count}`
                            : 'Assessed 0/0'
                        }
                    </TableCell>
                    <TableCell numeric>
                        {row.feedback ? 
                            <div className={classes.cursor} onClick={this.clickToFeedback}>
                                {timeAgo.format(new Date(row.feedback.lastest_feedback))}
                            </div>
                        : '' }
                    </TableCell>
                    <TableCell className={classes.cursor} numeric onClick={this.openComments}>{row.comments.length} Comments</TableCell>
                </TableRow>
                {assessment}
                {comments}
            </React.Fragment>
        )
    }
}

export default connect()(withStyles(styles)(Row));
