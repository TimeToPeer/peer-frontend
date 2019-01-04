import React, {Component} from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';
import SendSvg from 'Assets/images/send.svg';

interface IState { editorState: any; hasFocus: boolean; }
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
			hasFocus: false,
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(editorState: any) {
		this.setState({editorState});
		this.props.onChange(editorState.getCurrentContent().getPlainText());
	}

	render() {
		const hasFocus = this.state.hasFocus ? ' focused' : '';
		return (
			<div className={`emoji-input ${hasFocus}`}>
				<Editor
					editorState={this.state.editorState}
					onChange={this.onChange}
					placeholder={this.props.placeholder}
					onFocus={() => this.setState({ hasFocus: true })}
					onBlur={() => this.setState({ hasFocus: false })}
					spellCheck={true}
				/>
			</div>
		);
	}
}

export default EmojiInput;
