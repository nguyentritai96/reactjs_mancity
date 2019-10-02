import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {

    state = {
        isUploading:false, // quản lí tiến trình
        name:'', // tên file hình lưu trên storage
        fileURL:'' // lưu lại url của hình
    }

    // Các động thái: đổ dữ liệu hình đã có, up hình mới, xóa hình đã up

    static getDerivedStateFromProps(props,state){ // 1. đổ dữ liệu hình đã có
        if(props.defaultImg){ // nếu có link url
            return state = { // đổi state của component
                name:props.defaultImgName,
                fileURL:props.defaultImg
            }
        }
        return null
    }

    handleUploadStart = () => {
        this.setState({
            isUploading:true
        })
    }

    handleUploadError = () => {
        this.setState({
            isUploading:false
        })
    }

    handleUploadSuccess = (filename) => { //2. up hình mới
        this.setState({
            name:filename,
            isUploading:false
        });

        firebase.storage().ref(this.props.dir)
        .child(filename).getDownloadURL()
        .then( url => {
            this.setState({fileURL: url })
        }) // lấy link url

        this.props.filename(filename) // lưu tên vào image của formdata

    }

    uploadAgain = () => { //3. xóa hình đã up
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''
        });
        this.props.resetImage();
    }

    render() {
        return (
            <div>
                { !this.state.fileURL ? // nếu chưa có hình
                    <div>
                        <div className="label_inputs">{this.props.tag}</div>
                        <FileUploader
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={ this.handleUploadStart }
                            onUploadError={ this.handleUploadError }
                            onUploadSuccess={ this.handleUploadSuccess }
                        />
                    </div>
                    :null
                }
                { this.state.isUploading ?
                    <div className="progress"
                        style={{textAlign:'center',margin:'30px 0'}}
                    >
                        <CircularProgress
                            style={{color:'#98c6e9'}}
                            thickness={7}
                        />
                    </div>
                :null
                }
                { this.state.fileURL ? // nếu có hình
                    <div className="image_upload_container">
                        <img
                            style={{
                                width:'100%'
                            }}
                            src={this.state.fileURL}
                            alt={this.state.name}
                        />
                        <div className="remove" onClick={()=>this.uploadAgain()}>
                            Remove
                        </div>
                    </div>

                :null
                }
            </div>
        );
    }
}

export default Fileuploader;