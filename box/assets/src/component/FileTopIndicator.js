import React  from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Link} from 'react-router';
import {
    Grid,
    Row,
    Col,
    Button,
    FormGroup,
    InputGroup,
    FormControl,
    ControlLabel,
    Modal,
    FieldGroup
} from 'react-bootstrap'
import DragList from './DragList'

import fileTagActions from '../action/fileTagAction'

import 'font-awesome/css/font-awesome.css'
import '../style/styles.scss'
import '../style/file-uploader.scss'

class FileTopIndicator extends React.Component {

    constructor() {
        super()
        this.state = {
            showModal: false,
            value: ''
        }
        this.submit = this.submit.bind(this);
        this.handleChangeTag = this.handleChangeTag.bind(this);
        // this.handleChange2= this.handleChange2.bind(this);
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

handleChangeTag(event){
    // console.log(event.target.value)
this.props.actions.setInputFileTag(event.target.value);
}

// handleChange2(event){
// this.myInput.value = event.target.value;
// }

    submit(e) {
        e.preventDefault()

        let formData = new FormData();
        formData.append('file_tag',this.props.fTag)
        formData.append('user_id','supersu')
        // formData.append('input2',this.myInput.value)

        const filesToUpload = this.fileInput.files;
        console.log(filesToUpload.length,filesToUpload)
        for(let i=0,len=filesToUpload.length;i<len;i++){
            formData.append('file', filesToUpload[i])

        }

        console.log(formData.get('file'))
        // console.log(formData)

        fetch('/file/upload', {
            method: 'POST',
            body: formData
        }).then(function (response) {
            console.log("上传formData成功")
            console.log('响应结果',response);

        }).catch(function (err) {
            console.log("上传失败")
        });

    }


    render() {

let{fTag,actions}=this.props;

        return (
            <div>
                <Grid>
                    <Row >
                        <Col md={3}> <a href="/#/filemap"><i className="fa fa-map-marker fa-2x"></i></a> <Button bsClass="btn btn-all-files opacity75 to-m-left8" >所有文件</Button></Col>
                        <Col md={4}> </Col>
                        <Col md={2}>
                            <Button id="btnUpload" bsClass="btn btn-upload to-m-left8"
                                    onClick={this.open.bind(this)}>上传</Button>
                            <Button id="btnNew" bsClass="btn btn-default to-m-left20">新建</Button>
                        </Col>
                        <Col md={2}> <FormGroup>
                            <InputGroup>
                                <InputGroup.Button>
                                    <Button>搜索</Button>
                                </InputGroup.Button>
                                <FormControl type="text" placeholder="输入文件名"/>
                            </InputGroup>
                        </FormGroup>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </Grid>


                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title> <span className="font-file-name">上传文件到云盘</span></Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.submit}  >
                        <Modal.Body>
                            <div><span className="font-file-list">上传到： &frasl;</span></div>

                            <div>
                                <div className="display-inline-block">
                                    <label htmlFor="file[]" className="btn btn-default btn-upload">
                                        <i className="fa fa-plus fa-1x"></i> &nbsp;&nbsp;添加文件
                                    <input type="file"  className="file-input opacity0" ref={(c)=>{this.fileInput=c}} name="file[]"   multiple/>
                                    </label>
                                </div>


                                <div className="display-inline-block to-m-left8">
                                    <div><span className="font-file-list">添加标签：</span></div>
                                        <input type="text"  value={fTag} onChange={this.handleChangeTag}/>
                                    {/*<input type="text"  defaultValue="第二项input" ref=(i)=>this.myInput=i onChange=this.handleChange2/>*/}

                                </div>

                            </div>

                            <div>
                                {/*<FileDropbox ></FileDropbox>*/}

                                <div id="dropbox">
                                    <div className="font-file-list">
                                    <DragList>
                                        <span>可以把文件拖到这里</span>
                                            <span>无文件</span>
                                        <span>上船吧</span>
                                    </DragList>
                                </div>
                                </div>
                            </div>

                            <div>
                                <fieldset id="progress" style={{display: 'inline'}}>
                                    <div className="progress-trough">
                                        <div id="progress-bar" className="progress-bar">
                                            <span className="progress-bar-text">0%</span>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                        </Modal.Body>
                        <Modal.Footer id="uploadFooter">
                            <Button onClick={this.close.bind(this)}>取消</Button>
                            <button type='submit' className="btn btn-upload ">上传
                            </button>

                        </Modal.Footer>
                    </form>

                </Modal>

            </div>

        )
    }

}

const mapStateToProps = state => ({
    fTag: state.fileTag.fTag
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(fileTagActions, dispatch)

});

// export default FileTopIndicator
export default connect(mapStateToProps, mapDispatchToProps)(FileTopIndicator);
