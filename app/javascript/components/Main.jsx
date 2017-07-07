import React, {StyleSheet} from 'react';
import { 
    Grid, 
    Row, 
    Col,
    Button,
    Modal
} from 'react-bootstrap';

import {
    createVideo,
    getUploader
} from '../services/synqAPI';
import VideoThumbanil from './VideoThumbnail';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playingVideoIndex: 0,
            showModal: false,
            uploaderUrl: null,
        }
        this.addVideo = this.addVideo.bind(this);
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    addVideo() {
        this.setState({ showModal: true });
        createVideo((videoId) => {
            fetch('/video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({videoId})
            });
            getUploader(videoId, (uploader_url) => {
                console.log(uploader_url);
                this.setState({ uploaderUrl: uploader_url });
            });
        });
    }

    closeModal() {
        this.setState({ showModal: false, uploaderUrl: null });
    }

    onPlayVideo(index) {
        this.setState({playingVideoIndex: index});
    }

    renderThumbnails() {
        return this.props.videos.map((video, index) => {
            return (
                <VideoThumbanil
                    video={video}
                    videoIndex={index}
                    key={video.videoId}
                    onPlayVideo={this.onPlayVideo}
                />
            );
        });
    }

    render() {
        const {videos} = this.props;
        return (
            <Grid style={{ height: 300, marginTop: 20 }}>
                <Row className="show-grid" style={{ height: '100%' }}>
                    <Col xs={6} md={6} style={{ height: '100%' }}>
                        <iframe 
                            style={{ width: '100%', height: '100%' }}
                            allowFullScreen 
                            src={videos[this.state.playingVideoIndex] && 
                                videos[this.state.playingVideoIndex].embed_url} />
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
                                onClick={this.addVideo}
                            >
                                Add video
                            </Button>
                        </div>
                        <Grid style={{ width: '100%' }}>
                            {this.renderThumbnails()}
                        </Grid>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.closeModal}                    
                    style={{ width: '80%' }}
                >
                    <iframe style={{ height: '100%', width: '100%' }} src={this.state.uploaderUrl } />
                </Modal>
            </Grid>
        );
    }
}