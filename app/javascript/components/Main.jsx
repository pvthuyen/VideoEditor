import React, { Component } from 'react';
import {
  Modal,
  Grid,
} from 'react-bootstrap';
import {Player, ControlBar, BigPlayButton} from 'video-react';

import Item from './Item';
import VideoThumbnail from './VideoThumbnail';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      resultList: [],
      playingVideo: false,
      playingVideoIndex: 0,
    };
    this.goBack = this.goBack.bind(this);
    this.showResult = this.showResult.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  goBack() {
    this.setState({ showResult: false});
  }

  closeModal() {
    this.setState({ playingVideo: false });
  }

  onPlayVideo(index) {
    this.setState({ playingVideo: true, playingVideoIndex: index });
  }

  renderThumbnails() {
    return this.state.resultList.map((video, index) => {
      return (
          <VideoThumbnail
              videoIndex={index}
              key={video.name + '_' + video.second}
              onPlayVideo={this.onPlayVideo}
              thumbnailName={`/images/${video.name}_${('0000' + video.second).slice(-4)}.jpg`}
          />
      );
    });
  }

  showResult(resultList) {
    this.setState({ showResult: true, resultList: resultList });
  }

  render() {
    return (
      <main className="main" style={{
        padding: '1rem 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        minHeight: '60vh',
      }}>
      {
        this.state.showResult ?
        <div style={{ paddingTop: 20, width: '100%', height: '100%'}}>
          <img
            src='/back-button.jpg'
            style={{ marginLeft: 20, marginBottom: 20, width: 30, height: 30, cursor: 'pointer' }}
            onClick={() => {
              this.goBack();
            }}
          />
          <Grid style={{ width: '100%' }}>
            {this.renderThumbnails()}
          </Grid>
        </div>
        :
        "123456".split("").map((e, i) => <Item key={i} index={i} product={'0' + (i + 1)} showResult={this.showResult} />)
      }
        <Modal show={this.state.playingVideo} onHide={this.closeModal}                    
          style={{ width: '100%', padding: 'auto' }}
        >
        {
          this.state.playingVideo &&
          <Player 
            ref={(ref) => this.videoPlayer = ref}
            startTime={this.state.resultList[this.state.playingVideoIndex].second}>
            <source src={`/${this.state.resultList[this.state.playingVideoIndex].name}.mp4`}/>
            <BigPlayButton position='center' />
          </Player>
        }
        </Modal>
      </main>
    );
  }
}

export default Main;