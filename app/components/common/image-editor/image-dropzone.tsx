import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

const baseStyle = {
    width: 296,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
};
const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
};
const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
};
const textStyle = {
    textAlign: 'center' as 'center',
    marginTop: '96px',
}
  
interface IProps {onChange(e: any): void;}

class ImageDropzone extends Component<IProps, {}> {
    constructor(props: any) {
        super (props);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files: any) {
        this.props.onChange(files[0]);
    }

    render() {
        return (
            <Dropzone accept="image/*" onDrop={this.onDrop}>
                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                    let styles = {...baseStyle}
                    styles = isDragActive ? {...styles, ...activeStyle} : styles
                    styles = isDragReject ? {...styles, ...rejectStyle} : styles
                    
                    return (
                    <div 
                        {...getRootProps()}
                        style={styles}
                    >
                        <input {...getInputProps()} />
                        <div style={textStyle}>
                            {isDragAccept ? 'Drop' : 'Drag'} files here...
                        </div>
                        {isDragReject && <div>Unsupported file type...</div>}
                    </div>
                    )
                }}
            </Dropzone>
        )
    }
}

export default ImageDropzone;