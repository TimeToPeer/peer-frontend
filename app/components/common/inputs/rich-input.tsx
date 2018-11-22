import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import {
	ItalicButton,
	BoldButton,
	UnderlineButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
	HeadlineOneButton,
	HeadlineTwoButton,
	HeadlineThreeButton,
} from 'draft-js-buttons';
import { convertFromRaw } from 'draft-js';

const toolbarPlugin = createToolbarPlugin();
const linkifyPlugin = createLinkifyPlugin({
	component: (props: any) => (
	  // eslint-disable-next-line no-alert, jsx-a11y/anchor-has-content
		<a {...props} onClick={() => {
			if (props.href.indexOf('mailto:') === 0) {
				window.location.href = props.href;
			} else {
				window.open(props.href);
			}
		}} />
	),
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, linkifyPlugin];

interface IState { editorState: any; readerState: any; val: string; }
interface IProps { onSubmit: any; entry: any; }
class RichEditor extends Component<IProps, IState> {
	editor: any;

	constructor(props: any) {
		super(props);

		let storedState;
		if (props.entry.entry) {
			const parsedPost = convertFromRaw(JSON.parse(props.entry.entry));
			storedState = EditorState.createWithContent(parsedPost, null);
		}
		const initialEditorState = props.entry.entry ? storedState : EditorState.createEmpty();
		this.state = {
			editorState: initialEditorState,
			readerState: EditorState.createEmpty(),
			val: '',
		};
		this.onChange = this.onChange.bind(this);
		this.focus = this.focus.bind(this);
		this.editor = React.createRef();
		this.savePost = this.savePost.bind(this);
	}

	renderButtons(externalProps: any) {
		return (
			<div>
				<ItalicButton {...externalProps} />
				<BoldButton {...externalProps} />
				<UnderlineButton {...externalProps} />
				<Separator {...externalProps} />
				<HeadlineOneButton {...externalProps} />
				<HeadlineTwoButton {...externalProps} />
				<HeadlineThreeButton {...externalProps} />
				<Separator {...externalProps} />
				<UnorderedListButton {...externalProps} />
				<OrderedListButton {...externalProps} />
				<BlockquoteButton {...externalProps} />
			</div>
	  );
	}

	onChange(editorState: any) {
		this.setState({
		  editorState,
		});
	}

	focus() {
		this.editor.focus();
	}

	savePost() {
		const currnetContent = this.state.editorState.getCurrentContent();
		this.props.onSubmit(currnetContent);
	}
	render() {
		return (
			<div>
				<div className='editor-container' onClick={this.focus}>
					<Toolbar children={this.renderButtons}/>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						plugins={plugins}
						ref={(element: any) => { this.editor = element; }}
					/>
				</div>

				<button onClick={this.savePost}>post</button>
			</div>
		);
	}
}

export default RichEditor;
