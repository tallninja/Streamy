import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams()
    }

    renderAdminButtons(stream) {
        if(this.props.currentUserId === stream.userId) {
            return (
                <div className="right floated content">
                    <Link className="ui button primary small" to={`/streams/edit/${stream.id}`}>
                        <i className="ui icon edit"/>
                        Edit
                    </Link>
                    <Link className="ui button negative small" to={`/streams/delete/${stream.id}`}>
                        <i className="ui icon trash"/>
                        Delete
                    </Link>
                </div>
            );
        } else {
            return null;
        }
    }

    renderStreamCreateButton() {
        if(this.props.isSignedIn){
            return (
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Link className="ui button teal" to="/streams/create">
                        <i className="ui icon add"/>
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        return (   
            this.props.streams.map(stream => {
                return (
                    <div key={stream.id} className="item" >
                        {this.renderAdminButtons(stream)}
                        <Link to={`/streams/${stream.id}`}>
                        <div className="header">{stream.title}</div>
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                );
            })  
        );
    }

    render() {
        // console.log(this.props.streams)
        return (
            <div className="ui relaxed celled ordered list">
                <h3 className="header">Streams</h3>
                {this.renderList()}
                {this.renderStreamCreateButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams), //the object.values method is used to convert our object to a list.
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn 
    } 
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);