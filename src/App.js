import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import friends from "./friends.json";

// const shuffleArray = (array) => {
//   let counter = array.length;
//   //while there are elements in the array
//   while (counter > 0) {
//     let index = Math.floor(Math.random() * counter);
//     counter--;
//     let temp = array[counter];
//     array[counter] = array[index];
//     array[index] = temp;
//   }
//   return array;
// }

const shuffleArray = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    result: "",
    clicked: [],
    gameOver: false
  };

  // onClick = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends })
  // }; 

  onClick = id => {
    // if (this.state.clicked.indexOf(id) === -1) {
    //   console.log(this.state.clicked.indexOf(id))
    //   // it has not been clicked
    //   let clickedId = this.state.clicked;
    //   clickedId.push(id);
    //   this.setState({ 
    //     clicked: clickedId 
    //   })

    // } else {
    //   //it has already been clicked
    // };

    this.clickedPlayer(id);
    let newScramble = shuffleArray(friends);
    this.setState({ friends: newScramble })
  };




  componentDidMount() {
    this.setState({ result: "Click on the picture to play" })
  }
  clickedPlayer = (id) => {
    console.log(`Picture clicked with id: ${id}`);
    if (!this.state.clicked.includes(id)) {
      this.pointIncrease();
      this.state.clicked.push(id);
      this.setState({
        gameOver: false
      });
    } else {
      this.resetGame();
    }
  }
  pointIncrease = () => {
    let score = this.state.currentScore + 1;
    console.log(`the score is ${score}`);
    if (score === this.state.friends.length) {
      this.setState({
        result: "You win! Start clicking to play again!",
        topScore: score,
        currentScore: 0,
        clicked: [],
        friends,
        gameOver: false
      });
    } else if (score > this.state.topScore) {
      this.setState({
        topScore: score,
        currentScore: score,
        result: "Correct! New high score!"
      });
    } else {
      this.setState({
        currentScore: score,
        result: "Correct!"
      })
    }
    this.resetIconArray();
  }

  resetGame = () => {
    this.setState({
      points: 0,
      currentScore: 0,
      topScore: this.state.topScore,
      result: "You Loss!",
      clicked: [],
      friends,
      gameOver: true
    });
    this.resetIconArray();
  }
  resetIconArray = () => {
    let newScramble = shuffleArray(friends);
    this.setState({ friends: newScramble })
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <React.Fragment>
        <Header score={this.state.currentScore} topScore={this.state.topScore} result={this.state.result}>Clicky Game</Header>
        <Wrapper>
          {this.state.friends.map(friend => (
            <FriendCard
              onClick={this.onClick}
              id={friend.id}
              key={friend.id}
              name={friend.name}
              image={friend.image}
              occupation={friend.occupation}
              location={friend.location}
              shuffleArray={this.shuffleArray}
            />
          ))}


        </Wrapper>
      </React.Fragment>
    );
  }
}

export default App;
