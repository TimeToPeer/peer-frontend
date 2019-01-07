import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './row';

const styles = (theme: any) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	table: {
		minWidth: 700,
		'tr:nth-child(even)': {
            background: 'yellow'
        }
	},
});

interface IProps { classes: any; records: any; }
interface IState { rows: any; }

class Main extends Component<IProps, IState> {
	constructor (props: any) {
		super(props);
		this.state = {
			rows: [],
		}
	}
	
	componentDidMount() {
		const rows = this.constructRows(this.props.records);
		this.setState({ rows });
	}
	constructRows(records: any) {
		const rows:any = [];
		records.students.forEach((rec:any) => {
			const entry = records.entry[rec.id];
			const feedback = records.feedback.find((item:any)=> item.created_by === rec.id);
			const comments = records.comments.filter((item:any)=> item.created_by === rec.id);
			const name = `${rec.first_name} ${rec.last_name}`;
			rows.push({
				id: rec.id,
				name: name,
				posts: entry ? entry.post_count : 0,
				assessed: entry ? entry : {},
				feedback: feedback ? feedback : '',
				comments: comments,
			});
		});
		return rows;
	}

	render() { 
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
						<TableCell>STUDENT NAME</TableCell>
						<TableCell numeric>POSTS</TableCell>
						<TableCell numeric>SKILLS</TableCell>
						<TableCell numeric>FEEDBACK</TableCell>
						<TableCell numeric>COMMENTS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.rows.map((row: any) => {
							return (
								<Row row={row} key={row.id}/>
							);
							})
						}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default withStyles(styles)(Main);