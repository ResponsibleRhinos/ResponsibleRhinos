//chai
import { assert, expect } from 'chai';
import should from 'chai/register-should';
//sinon
import { spy } from 'sinon';
//enzyme
import { mount, shallow, render } from 'enzyme';
//react utils
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
//react component
import LoggedIn from '../react-client/src/components/loggedin.jsx';
//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

describe('LoggedIn', () => {
  describe('mounting type tests', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<LoggedIn />);
      assert.isOk(wrapper);
    });
    it('mounts onto DOM', () => {
      const wrapper = mount((
        <MuiThemeProvider>
        <LoggedIn />
        </MuiThemeProvider>
      ));
      expect(wrapper.contains(
        <MuiThemeProvider>
        <LoggedIn />
        </MuiThemeProvider>
      )).to.equal(true);
    });
    it('should be a div container with AppBar', () => {
      expect(shallow(<LoggedIn />).is('div')).to.equal(true);
    });
    it('mounting adds to our html', () => {
      expect(mount(
        <MuiThemeProvider>
        <LoggedIn />
        </MuiThemeProvider>
      ).find('AppBar').length).to.equal(1);
    });
    it('calls render when mounting', () => {
      spy(Header.prototype, 'render');
      const wrapper = mount(
        <MuiThemeProvider>
        <LoggedIn />
        </MuiThemeProvider>
      );
      expect(Header.prototype.render.calledOnce).to.equal(true);
    });
    // it('calls render when mounting', () => {
    //   spy(Header.prototype, 'render');
    //   const wrapper = mount(<Header />);
    //   expect(Header.prototype.render.calledOnce).to.equal(true);
    // });
    // it('calls componentDidUpdate on property change', () => {
    //   spy(Header.prototype, 'componentDidUpdate');
    //   const wrapper = mount(<Header searchPlace={'something'}/>);
    //   wrapper.setProps({ searchPlace: 'changed location'});
    //   expect(Header.prototype.componentDidUpdate.calledOnce).to.equal(true);
    // });
  });
});
