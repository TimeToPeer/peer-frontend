import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
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

interface IState { editorState: any; readerState: any; }
interface IProps { post: any; }

class FeedRow extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			readerState: EditorState.createEmpty(),
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(editorState: any) {
		this.setState({
		  editorState,
		});
	}

	renderPosts(post: any) {
		if (!post) { return null; }

		const parsedPost = convertFromRaw(JSON.parse(post));
		const storedState = EditorState.createWithContent(parsedPost, null);
		return (
			<div className='results'>
				<Editor
					editorState={storedState}
					plugins={plugins}
					onChange={this.onChange}
					readOnly={true}
				/>
			</div>
		);
	}

	render() {
		const { post } = this.props;
		return (
			<div>
				{this.renderPosts(post)}
			</div>
		);
	}
}

export default FeedRow;
