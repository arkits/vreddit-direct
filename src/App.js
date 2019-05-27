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
      form_link: "",
      video_links: [
        {
          link: "",
          quality: ""
        },
      ],
      api_status: "NOT_CONNECTED",
      api_version: "v0",
    };
  }

  processFormLink = (link) => {

    var video_id = link.substring(18);
    
    // remove the last '/'
    if(video_id[video_id.length -1] === "/"){
      video_id = video_id.substring(0, video_id.length - 1);
    }

    // handle input - https://v.redd.it/<video_id>/DASHPlaylist.mpd
    if(video_id.endsWith("/DASHPlaylist.mpd")){
      var video_id_spilt = video_id.split("/DASHPlaylist.mpd");
      video_id = video_id_spilt[0];
    }

    console.log("video_id=" + video_id);

    axios.get("https://vreddit-direct-api.herokuapp.com/direct/" + video_id).then(response => {
      console.log("API Response ");
      console.log(response.data.video_links);
      this.setState({
        video_links: response.data.video_links
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        video_links: "SOMETHING_WENT_WRONG"
      });
    });
  }

  componentDidMount() {
    axios.get("https://vreddit-direct-api.herokuapp.com").then(response => {
      this.setState({
        api_status: response.data.status,
        api_version: response.data.version
      });
    }).catch(function (error) {
      console.log(error);
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
                processFormLink={this.processFormLink}
              />
              <br /><br />
              <Container maxWidth="sm">
                <br />
                <center>
                  <ResultCard
                    video_links={this.state.video_links}
                  />
                </center>
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
