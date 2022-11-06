// a component that let user add a post

import React, { Component, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

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
        console.log(this.state);
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
                    <Grid container
                    direction = "column"
                    spacing = {5}
                    >
                        <Grid item>
                            <input type="text" id="title" onChange={this.handleChange} value={this.state.title} />
                        </Grid>
                        <Grid item>
                            <textarea id="body" onChange={this.handleChange} value={this.state.body}></textarea>
                        </Grid>
                        <Grid item>
                            <button>Submit</button>
                        </Grid>
                    </Grid>
                    
                    
                </form>
            </div>
        )
    }
}

export default AddPost;
