import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import CardList from "../components/CardList";
import { robots } from "../Robots";
import Scroll from "../components/Scroll"
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css"

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }

        console.log("constructor");
    }

    componentDidMount() {

        // Make request to server
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));

        console.log("component did mount");
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

        // console.log(filteredRobots);
    }

    render() {
        const { robots, searchfield } = this.state;

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        console.log("render");


        // Condition just to show 'Loading' if it takes too much time to load the data
        // (robots.length === 0) can be written as (robots.length) in JS
        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }
}

export default App;