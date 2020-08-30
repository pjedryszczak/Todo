import React, {Component, FormEvent } from 'react'
import { sanitizeInput } from '../helpers';

interface LocalState {
    content: string    
}
interface ComponentProps {
    addFunc: (content: string) => void,
    placeholder: string
}
export default class AddComponent extends Component<ComponentProps,LocalState> {
    state = {
        content: ''
    }
    handleChange =(e: FormEvent<EventTarget>) => {
        const target = e.target as HTMLInputElement;
        this.setState({
            content: target.value
        })
    }
    handleSubmit = (e: FormEvent<EventTarget>) => {
        e.preventDefault();
        
        this.props.addFunc(this.state.content);
        this.setState({
            content: ''
        });
    }
    handleKeyDown = (e: any) => {
        sanitizeInput(e);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>{this.props.placeholder}</label>
                    <input type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown} value={this.state.content} />
                </form>
            </div>
        )
    }
}