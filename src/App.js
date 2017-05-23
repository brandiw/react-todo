import React, { Component } from 'react';
import Header from './header';
import './App.css';

const App = React.createClass({
  getInitialState: function(){
    return {
      toDos: ['Mow the lawn', 'Feed the cat', 'Water the flowers'],
      newItem: '',
      errorMessage: ''
    }
  },
  clear: function(){
    this.setState({ toDos: [] });
  },
  addItem: function(e){
    e.preventDefault();
    if(this.state.newItem === ''){
      this.setState({ errorMessage: 'Please type something!!' });
    }
    else {
      const toDos = this.state.toDos;
      toDos.push(this.state.newItem);
      this.setState({ toDos: toDos, newItem: '', errorMessage: '' });
    }
  },
  deleteItem: function(item){
    const toDos = this.state.toDos;
    const itemIndex = toDos.indexOf(item);
    if(itemIndex >= 0){
      toDos.splice(itemIndex, 1);
      this.setState({ toDos: toDos });
    }
  },
  newItemChange: function(e){
    this.setState({ newItem: e.target.value });
  },
  render: function(){
    return (
      <div className="container">
        <Header />
        <ToDoList items={this.state.toDos} onDelete={this.deleteItem} />
        <p className="text-danger">{this.state.errorMessage}</p>
        <form onSubmit={this.addItem}>
          <input type="text"
            placeholder="Add a new one"
            className="form-control"
            onChange={this.newItemChange}
            value={this.state.newItem} />
        </form>
        <button onClick={this.addItem} className="btn btn-primary">ADD</button>
      </div>
    );
  }
});

const ToDoList = React.createClass({
  propTypes: {
    onDelete: React.PropTypes.func
  },
  deleteHandler: function(item){
    if(typeof this.props.onDelete === 'function'){
      this.props.onDelete(item);
    }
  },
  render: function(){
    const toDoItems = this.props.items.map(item => {
      return <ListItem item={item} key={item} onDelete={this.deleteHandler}></ListItem>
    });

    return (
      <ul className="list-group">{toDoItems}</ul>
    );
  }
});

const ListItem = React.createClass({
  propTypes: {
    onDelete: React.PropTypes.func
  },
  deleteHandler: function(){
    if(typeof this.props.onDelete === 'function'){
      this.props.onDelete(this.props.item);
    }
  },
  render: function(){
    return (
      <li className="list-group-item">
        {this.props.item}
        <button className="btn-xs btn-danger pull-right" onClick={this.deleteHandler}>X</button>
      </li>
    );
  }
});

export default App;
