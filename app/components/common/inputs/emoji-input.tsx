import React, {Component} from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';

interface IState { editorState: any; }
interface IProps { placeholder: string; clearEditor: boolean; onChange(val: string): void; }

class EmojiInput extends Component<IProps, IState> {
	static getDerivedStateFromProps(props: any, state: any) {
		const editorState = EditorState.push(state.editorState, ContentState.createFromText(''), 'remove-range');
		if (props.clearEditor) {
			return { editorState };
		}
		return null;
	}
	constructor(props: any) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(editorState: any) {
		this.setState({editorState});
		this.props.onChange(editorState.getCurrentContent().getPlainText());
	}

	render() {
		return (
			<div className='emoji-input'>
				<Editor editorState={this.state.editorState} onChange={this.onChange} placeholder={this.props.placeholder} />
			</div>
		);
	}
}

export default EmojiInput;
