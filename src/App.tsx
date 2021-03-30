import './App.css';
import * as React from 'react';


const axios = require('axios').default;
const url: string = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';

async function getPage() {
  console.log('getting page')
  try {
      const response = await axios.get(url);
      return(response);
  } catch (exception) {
      console.log('exception')
      process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
  }
}

export class Wiki extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props)
    this.onClick = this.onClick.bind(this);
  }

  state = {
    page: null
  }

  display(title: string) {
    if (title.indexOf(">") > -1) {
      const titlesub = title.substr(title.indexOf(">") + 1)
      const titlesubsub = titlesub.substr(0, titlesub.indexOf("<"))
      return(titlesubsub)
    }
    return(title)
  }

  async onClick() { 
    console.log("clicked")

    const page = await getPage()
    this.setState({page: page})

    console.log(this.state)
  }

  render() {
    console.log('rendering wiki')
    if (this.state.page == null) {
      console.log('null page')
      return(
        <div className = "wiki">
          <button className = 'wikibutton' onClick = {this.onClick}>New Random Topic</button>
        </div>
      )
    } else {
      return(
        <div className = "wiki">
          <button className = 'wikibutton' onClick = {this.onClick}>New Random Topic</button>
          <h1>{this.display(this.state.page!['data']['displaytitle'])}</h1>
          <p>{this.state.page!['data']['description']}</p>
          <a className = 'wikibutton' target = '_blank' href = {this.state.page!['data']['content_urls']['desktop']['page']}>Go to Wiki!</a>
        </div>
      )
    }
  }
}

export class App extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props)
  }

  render() {
    console.log('test');
      
    return (
      <div className="App">
        <Wiki/>
      </div>
    );
  }
}

export default App;
