import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from 'material-ui/MenuItem';

export class Autocomplete extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      root: {
        fontSize: 16,
        lineHeight: '24px',
        width: props.fullWidth ? '100%' : 256,
        display: 'inline-block',
        position: 'relative',
        border: 'none',
        cursor: props.disabled ? 'not-allowed' : 'auto',
        marginLeft: '35%',
        marginBottom: '1%'
      }
    };
  }
  
  componentDidUpdate(prevProps) {
    const {google} = this.props;
    const map = window.map;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }
  
  componentDidMount() {
    this.renderAutoComplete();
  }
  
  renderAutoComplete() {
    const {google} = this.props;
    const map = window.map;
    if (!google || !map) { return; }
    
    const autocompleteRef = this.refs.autocomplete;
    const autocompleteNode = ReactDOM.findDOMNode(autocompleteRef);
    var autocomplete = new google.maps.places.Autocomplete(autocompleteNode);
    autocomplete.bindTo('bounds', map);
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.props.searchPlace(place, map);
    });
  }
  
  render() {
    return (
      <input
        type="text" 
        ref="autocomplete"
        style={this.styles.root}
      />
    );
  }
}

export default Autocomplete;