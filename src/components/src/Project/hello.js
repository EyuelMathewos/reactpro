class App extends React.Component {
    constructor () {
  super()
  this.state = {someData: null} }
  componentDidMount () {
  var request = new XMLHttpRequest(); request.open('GET', '/my/url', true);
  request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
  // Success!
  this.setState({someData: request.responseText}) } else {
          // We reached our target server, but it returned an error
          // Possibly handle the error by changing your state.
  } };
  request.onerror = () => {
  // There was a connection error of some sort.
  // Possibly handle the error by changing your state.
  };
      request.send();
    }
  render() { return (
  <div>{this.state.someData || 'waiting for response...'}</div> )
  } }
  React.render(<App />, document.getElementById('root'))