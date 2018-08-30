import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import DropOrPasteImages from 'slate-drop-or-paste-images'
import initialValue from './value.json'
import {Editor} from 'slate-react'
import {Value} from 'slate'

class Image extends React.Component {

    state = {};

    componentDidMount() {
        const {node} = this.props;
        const {data} = node;
        const file = data.get('file');
        this.load(file)
    }

    load(file) {
        console.log("$$$$$$$" + file)
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState({src: reader.result}));
        reader.readAsDataURL(file)
    }

    render() {
        const {attributes} = this.props;
        const {src} = this.state;
        console.log("############" + src);
        return src
            ? <img {...attributes} src={src} alt="" style={{maxWidth: '80%', maxHeight: '70vh'}} />
            : <span {...attributes}>Loading...</span>
    }

}

class App extends Component {

    schema = {
        nodes: {
            image: Image
        }
    };

    plugins = [
        DropOrPasteImages({
            insertImage: (transform, file) => {
                return transform.insertBlock({
                    type: 'image',
                    isVoid: true,
                    data: { file },
                })
            }
        })
    ];

    state = {
        value: Value.fromJSON(initialValue)
    };

    onChange = ({ value }) => {
        this.setState({ value })
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Editor
                    value={this.state.value}
                    plugins={this.plugins}
                    onChange={this.onChange}
                    renderNode={this.renderNode}
                />
            </div>
        );
    }

    renderNode = (props) => {
        // switch (props.node.type) {
        //     case 'image': return <Image {...props} />
        // }
        if(props.node.type === 'image') {
            return <Image {...props} />
        }
    }
}

export default App;
