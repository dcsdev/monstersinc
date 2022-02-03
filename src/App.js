import "./App.css";
import React from "react";
import { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((users) => this.setState({ monsters: users }));

    this.GetPostsForFirstUsers();
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters, Inc.</h1>
        <SearchBox
          placeHolder="search monsters"
          handleChange={this.handleChange}
        ></SearchBox>
        <CardList monsters={filteredMonsters}> </CardList>{" "}
      </div>
    );
  }

  GetPostsForFirstUsers = async () => {
    try {
      const usersResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await usersResponse.json();
      const myUser = users[0];

      console.log(myUser);

      const postsResponse = await fetch(
        "https://jsonplaceholderx.typicode.com/posts?userId=" + myUser.id
      );
      const posts = await postsResponse.json();

      console.log(posts);
    } catch (error) {
      console.log("Error Encountered...");
    }
  };
}

export default App;
