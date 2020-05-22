import React, {Component} from 'react';

class UploadProductsMultiple extends Component {
    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props);
        this.state = {
            file: [null]
        };
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.onSubmitFunction = this.onSubmitFunction.bind(this)
    }

    onSubmitFunction(e){
        e.preventDefault();
        // console.log('submit');
        window.location.assign("http://localhost:3000/");
    }

    uploadMultipleFiles(e) {
        if (e.target.files.length <= 5) {
            console.log('array length', this.fileArray.length);

            this.fileObj.push(e.target.files);
            console.log('dannathi length', this.fileObj[0].length);
            for (let i = 0 ; i < this.fileObj[0].length; i++) {
                this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
            }

            this.setState({file: this.fileArray});
        }
    }

    uploadFiles(e) {
        e.preventDefault();
        console.log(this.state.file)
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="card mt-4" style={{width: "70%"}}>
                    <div className="m-2">
                        <h1>File Upload</h1>
                        <p><b>5 images</b> of your Product can only be uploaded. Actual Images should be attached!</p>
                    </div>
                    <br/>
                    <form action="http://localhost:8000/upload" method="POST" encType="multipart/form-data">

                        <input type="text" className="input-group" required name="productName" />
                        <div className="form-group multi-preview">
                            {(this.fileArray || []).map(url => (
                                <img src={url} alt="..." className="w-25 m-2"/>
                            ))}
                        </div>

                        {/*<div className="form-group">*/}
                        {/*    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple disabled={this.fileArray.length>4}/>*/}
                        {/*</div>*/}
                        <div className="input-group">
                            <div className="custom-file">
                                <input name="files" type="file" className="custom-file-input" id="inputGroupFile01"
                                       aria-describedby="inputGroupFileAddon01" onChange={this.uploadMultipleFiles} multiple disabled={this.fileArray.length>4}/>
                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-danger btn-block" onSubmit={this.onSubmitFunction}>Upload</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UploadProductsMultiple;