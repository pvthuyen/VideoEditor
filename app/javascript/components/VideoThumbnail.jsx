import React from 'react';
import {
    Col
} from 'react-bootstrap';

export default class VideoThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoover: false
        }
        this.toggleHoover = this.toggleHoover.bind(this);
        this.onPlayClick = () => this.props.onPlayVideo(this.props.videoIndex);
    }

    toggleHoover() {
        this.setState({hoover: !this.state.hoover});
    }
    
    render() {
        return (
            <Col 
                xs={8}
                md={4}
                style={styles.container} 
            >
                <img 
                    onMouseEnter={this.toggleHoover}
                    onMouseLeave={this.toggleHoover}
                    src={this.props.thumbnailName} 
                    style={this.state.hoover ? styles.imageHoover : styles.image} 
                />
                <div 
                    style={this.state.hoover ? styles.middleHoover : styles.middle} 
                    onClick={this.onPlayClick}
                >
                    <div style={styles.text}>Play</div>
                </div>
            </Col>
        );
    }
}

const styles = {
    container: {
        position: 'relative',
        padding: 10,
    },
    image: {
        opacity: 1,
        display: 'block',
        width: '100%',
        height: 'auto',
        transition: '.5s ease',
        backfaceVisibility: 'hidden'
    },
    middle: {
        transition: '.5s ease',
        opacity: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    imageHoover: {
        opacity: 0.3,
        display: 'block',
        width: '100%',
        height: 'auto',
        transition: '.5s ease',
        backfaceVisibility: 'hidden'
    },
    middleHoover: {
        transition: '.5s ease',
        opacity: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    text: {
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '12px',
        padding: '8px 16px'
    }
};