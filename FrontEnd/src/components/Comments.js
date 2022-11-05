// a component that let user add a post

import React, { Component, useEffect, useState } from 'react';


class AddPost extends Component {

    state = {
        title: '',
        body: ''
    }

    handleChange = (e) => {
        console.log(e.target.title);
        console.log(e.target.body);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
        this.props.addPost(this.state);
        this.setState({
            title: '',
            body: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
                    <label htmlFor="body">Body</label>
                    <textarea id="body" onChange={this.handleChange} value={this.state.body}></textarea>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddPost;
