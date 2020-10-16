import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef()
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    buildPlayer() {
        if(this.player || !this.props.stream) {
            return null;
        } else {
            const { id } = this.props.match.params;
            this.player = flv.createPlayer({
                type: 'flv',
                url: `http://localhost:8000/live/${id}.flv`
            });
            this.player.attachMediaElement(this.videoRef.current);
            this.player.load();
        }
    }

    renderContent() {
        const { stream } = this.props
        if(this.props.stream) {
            return (
                <div>
                    <video ref={this.videoRef} style={{ width: '100%' }} controls={true} />
                    <div className="ui segment">
                        <div className="content">
                            <h3 className="header">{stream.title}</h3>
                            <p>{stream.description}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = (state, newProps) => {
    return { stream: state.streams[newProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);