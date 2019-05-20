import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import './App.css';

import 'axios';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ResultCard from './components/ResultCard/ResultCard';
import Footer from './components/Footer/Footer';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form_link: "placeholder",
      results: "placeholder",
      api_status: "NOT_CONNECTED",
      api_version: "v0",
    };
  }

  setFormLink = (link) => {
    console.log("setFormLink was called");

    this.setState({
      results: link
    })
  }

  componentDidMount() {

    axios.get("https://vreddit-direct-api.herokuapp.com").then(response => {
      this.setState({ 
        api_status : response.data.status, 
        api_version : response.data.version 
      });
    });
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <main>
          <Container>
            <Header />
            <Form
              form_link={this.state.form_link}
              setFormLink={this.setFormLink}
            />

            <br />
            <br />

            <Container maxWidth="sm">

              <br />

              <ResultCard
                results={this.state.results}
              />

            </Container>

            <br /><br />

          </Container>
          </main>

          <footer>
            <Footer 
              api_status={this.state.api_status}
              api_version={this.state.api_version}
            />
          </footer>

        </MuiThemeProvider>

      </div>
    );
  }

}

export default App;
