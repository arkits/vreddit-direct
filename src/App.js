import React, { Component } from 'react';
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ResultCard from './components/ResultCard/ResultCard';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      form_link: "yoo"
    };
  }

  letsGo = (days) => {
    console.log("Go was clicked!");
    this.setState({
      form_link: days
    })
    console.log(days);
}

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Header />
            <Form 
              form_link={this.state.form_link}
              letsGo={this.letsGo}
            />

            <br />
            <br />

            <Container maxWidth="sm">
              <ResultCard 
                form_link={this.state.form_link}
              />
            </Container>

          </Container>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default App;
