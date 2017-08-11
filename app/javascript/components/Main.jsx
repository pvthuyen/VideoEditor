import React, {StyleSheet} from 'react';
import { 
    Grid, 
    Row, 
    Col,
    Button,
    Modal
} from 'react-bootstrap';
import {Player, ControlBar, BigPlayButton} from 'video-react';
import Dropzone from 'react-dropzone';

import {
    createVideo,
    getUploader
} from '../services/synqAPI';
import VideoThumbanil from './VideoThumbnail';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            resultList: [],
            playingVideoIndex: 0
        }
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    closeModal() {
        this.setState({ showModal: false});
    }

    onPlayVideo(index) {
        this.setState({ playingVideoIndex: index });
        this.videoPlayer.load(`/${this.state.resultList[index].name}.mp4`);
        this.videoPlayer.seek(this.state.resultList[index].second);
    }

    renderThumbnails() {
        return this.state.resultList.map((video, index) => {
            return (
                <VideoThumbanil
                    thumbnailName={`/images/${video.name}_${("000" + video.second).slice(-4)}.jpg`}
                    videoIndex={index}
                    key={video.name + '_' + video.second}
                    onPlayVideo={this.onPlayVideo}
                />
            );
        });
    }

    onDrop(acceptedFiles, rejectedFiles) {
        if (acceptedFiles.length > 0) {
            let form = new FormData();
            form.append('image', acceptedFiles[0]);
            fetch('/upload_file', {
                method: 'POST',
                headers: {
                },
                body: form
            })
                .then(res => res.json())
                .then(resultList => {
                    this.setState({ showModal: false, resultList });
                });
        }
    }

    render() {
        console.log(this.state.resultList);
        console.log(this.state.resultList[this.state.playingVideoIndex]);
        return (
            <Grid style={{ height: 300, marginTop: 20 }}>
                <Row className="show-grid" style={{ height: '100%' }}>
                    <Col xs={6} md={6} style={{ height: '100%' }}>
                    {
                    this.state.resultList && this.state.resultList.length > 0 &&
                    <Player 
                        ref={(ref) => this.videoPlayer = ref}
                        startTime={this.state.resultList[this.state.playingVideoIndex].second}>
                        <source src={`/${this.state.resultList[this.state.playingVideoIndex].name}.mp4`}/>
                        <BigPlayButton position='center' />
                    </Player>
                    }
                    </Col>
                    <Col xs={6} md={6} style={{ height: '100%' }}>
                        <div style={{ height: 60 }}>
                            <div style={{ 
                                display: 'inline', 
                                fontSize: '18pt' }}
                            >
                                Your videos
                            </div>
                            <Button 
                                style={{ display: 'inline', right: 0, position: 'absolute' }}
                                bsStyle="primary" 
                                bsSize="large"
                                onClick={() => this.setState({ showModal: true })}
                            >
                                Search photo
                            </Button>
                        </div>
                        <Grid style={{ width: '100%' }}>
                            {this.renderThumbnails()}
                        </Grid>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.closeModal}                    
                    style={{ width: '80%', padding: 'auto' }}
                >
                    <Dropzone accept="image/jpeg, image/png" 
                        onDrop={this.onDrop} 
                        style={{width: '100%', height: 100, padding: 'auto' }}>
                        <div style={{width: '100%', fontSize: 22, 
                        textAlign: 'center', height: '100%', lineHeight: 4}}>
                            Drop images here!
                        </div>
                    </Dropzone>
                </Modal>
            </Grid>
        );
    }
}