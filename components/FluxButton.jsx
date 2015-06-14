var React = require('react'),
    AppDispatcher = require('../AppDispatcher.js'),
    Clicks = require('../stores/Clicks.js');

require('./SimpleButton.less');

function getClicks() {
  return {
    clicks: Clicks.getCount()
  };
}

class FluxButton extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = getClicks();
  }

  componentDidMount() {
    Clicks.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Clicks.removeChangeListener(this.onChange);
  }

  render() {
    return <button type="button"
                   disabled={this.props.disabled}
                   className="SimpleButton"
                   onClick={this.onClick}>
      {this.state.clicks == 0 ? 'Click and let click' :
           this.state.clicks === 1 ? 'Clicked once' :
               'Clicked ' + this.state.clicks + ' times'}
    </button>;
  }

  onClick() {
    AppDispatcher.dispatch({
      actionType: 'click'
    });
  }

  onChange() {
    this.setState(getClicks());
  }
}

module.exports = FluxButton;
