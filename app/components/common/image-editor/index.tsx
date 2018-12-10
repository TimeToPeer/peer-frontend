import React, {Component, createRef} from 'react';
import Popup from 'reactjs-popup';
import EmojiInput from 'Common/inputs/emoji-input';
import ImageIcon from 'Assets/images/toolbar-icons/image-icon.svg';
import EmojiIcon from 'Assets/images/toolbar-icons/emoji-icon.svg';
import BrushIcon from 'Assets/images/toolbar-icons/brush-icon.svg';
import VideoIcon from 'Assets/images/toolbar-icons/video-icon.svg';
import TextIcon from 'Assets/images/toolbar-icons/text-icon.svg';
import VoiceIcon from 'Assets/images/toolbar-icons/voice-icon.svg';

import 'Styles/fonts.scss';

interface IState { openImageUpload: boolean; imgSrc: any; inputVal: string; imgSuccess: boolean; imgData: string; imgError: boolean; }
interface IProps { error: boolean; onSubmit(val: string, inputval: string): void; }

class MyImageEditor extends Component<IProps, IState> {
	private myCanvas: any;
	private hiddenCanvas: any;
	private overlayText: any;
	private imgPos: any;

	constructor(props: any) {
		super(props);

		this.state = {
			openImageUpload: false,
			imgSrc: '',
			inputVal: '',
			imgSuccess: false,
			imgData: '',
			imgError: false,
		};
		this.myCanvas = createRef<HTMLDivElement>();
		this.hiddenCanvas = createRef<HTMLDivElement>();
		this.overlayText = createRef<HTMLDivElement>();

		this.importImage = this.importImage.bind(this);
		this.handleImgSrc = this.handleImgSrc.bind(this);
		this.drawImage = this.drawImage.bind(this);
		this.saveImage = this.saveImage.bind(this);
		this.urlInputChange = this.urlInputChange.bind(this);
		this.handleUrlImgSrc = this.handleUrlImgSrc.bind(this);
		this.onInputChange = this.onInputChange.bind(this);

		this.imgPos = {};
	}

	urlInputChange(event: any) {
		this.setState({ imgSrc: event.target.value });
	}

	handleUrlImgSrc(event: any) {
		this.setState({openImageUpload: false});
		const canvas = this.myCanvas.current;
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.drawImage(this.state.imgSrc, false);
	}

	importImage() {
		this.setState({openImageUpload: true});
	}

	handleImgSrc(event: any) {
		this.setState({openImageUpload: false});
		const canvas = this.myCanvas.current;
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.drawImage(event.target.files[0], true);
	}

	drawImage(imgSrc: string, isFile: boolean) {
		const overlayText = this.overlayText.current;
		overlayText.style.display = 'none';
		const canvas = this.myCanvas.current;
		const ctx = canvas.getContext('2d');
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => {
			this.setState({imgSuccess: true, imgError: false});
			ctx.imageSmoothingEnabled = false;
			const hRatio = canvas.width / img.width    ;
			const vRatio = canvas.height / img.height  ;
			const ratio  = Math.min ( hRatio, vRatio );
			const centerX = ( canvas.width - img.width * ratio ) / 2;
			const centerY = ( canvas.height - img.height * ratio ) / 2;
			this.imgPos.x = centerX;
			this.imgPos.y = centerY;
			this.imgPos.width =  img.width * ratio;
			this.imgPos.height =  img.height * ratio;
			ctx.drawImage(img, 0, 0, img.width, img.height,
				centerX, centerY, img.width * ratio, img.height * ratio);
		};
		img.onerror = (error) => {
			this.setState({imgError: true});
		}
		if (isFile) {
			img.src = URL.createObjectURL(imgSrc);
		} else {
			img.src = imgSrc;
		}
	}

	onInputChange(val: string) {
		this.setState({ inputVal: val });
	}

	saveImage() {
		const canvas = this.myCanvas.current;
		const hiddenCanvas = this.hiddenCanvas.current;
		const ctx = canvas.getContext('2d');
		const hiddenCtx = hiddenCanvas.getContext('2d');
		const { x, y, width, height } = this.imgPos;
		if (x >= 0 && y >= 0 && width >= 0 && height >= 0) {
			const imgData = ctx.getImageData(x, y, width, height);
			hiddenCanvas.width = width;
			hiddenCanvas.height = height;
			hiddenCtx.putImageData(imgData, 0, 0);
		}
		const canvas64 = this.state.imgSuccess ? hiddenCanvas.toDataURL() : '';
		this.props.onSubmit(canvas64, this.state.inputVal);
	}

	render() {
		return(
			<div className='image-editor'>
				<div className='canvas-container'>
					<canvas ref={this.myCanvas} width='1024' height='716' />
					<canvas ref={this.hiddenCanvas} width='1024' height='716' style={{display: 'none'}}/>
					<div className='over-text' ref={this.overlayText}>
						<span className='text-big'>
							LET'S POST <br /> SOMETHING
						</span>
						<span className='text-small'>
							Put in your two bits <br /> Post to your PEERS network!
						</span>
					</div>
					<div className='canvas-toolbar'>
						<div className='toolbar-item'><img className='not-available' src={EmojiIcon} /></div>
						<div className='toolbar-item'><img className='not-available' src={BrushIcon} /></div>
						<div className='toolbar-item'>
							<Popup
								trigger={
									<img src={ImageIcon} onClick={this.saveImage} />
								}
								position='top center'
								open={this.state.openImageUpload}
								onOpen={this.importImage}
								offsetY={15}
							>
								<div className='file-input-container'>
									<input className='file-input' type='file' onChange={this.handleImgSrc} />
									<div className='url-input-label'>---or insert URL from the web---</div>
									<input className='url-input' onChange={this.urlInputChange} />
									<button className='url-import' onClick={this.handleUrlImgSrc}>import</button>
								</div>
							</Popup>
						</div>
						<div className='toolbar-item'><img className='not-available' src={VideoIcon} /></div>
						<div className='toolbar-item'><img className='not-available' src={TextIcon} /></div>
						<div className='toolbar-item'><img className='not-available' src={VoiceIcon} /></div>
					</div>
				</div>
				<div className='footer'>
					<div className='caption-input'>
						<EmojiInput placeholder='Add a caption...' onChange={this.onInputChange} clearEditor={false} />
					</div>
					<div className='error-msg'>{ this.props.error ? 'You must include image, caption and self assessment' : ''}</div>
					<div className='error-msg'>{ this.state.imgError ? 'Url blocked. Please either try another image or upload image from computer' : ''}</div>
					<div className='button-container'>
						<button>SAVE</button>
						<button onClick={this.saveImage}>POST</button>
					</div>
				</div>
			</div>
		);
	}
}

export default MyImageEditor;
