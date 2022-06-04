import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  BackHandler,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import Routes from './src/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/redux/store/store';
import { Colors } from './src/constants';
import HoldOnPopUp from './src/components/Modal/Center/HoldOnPopUp';
import FlashMessage from 'react-native-flash-message';


//ref :
//https://github.com/VinitBhavsar/React-Native-Project-Structure?ref=reactnativeexample.com
//https://reactnativeexample.com/react-native-project-structure/#:~:text=Folder%20structure&text=src%20%3A%20This%20folder%20is%20the,the%20code%20inside%20your%20application.&text=constants%20%3A%20Folder%20to%20store%20any,Folder%20to%20store%20the%20navigators.&text=views%20%3A%20Folder%20that%20contains%20all%20your%20application%20screens%2Ffeatures.

class App extends Component {
  constructor(props) {
    console.log = () => null
    Text.defaultProps = Text.defaultProps || {}
    Text.defaultProps.allowFontScaling = false
    TextInput.defaultProps = TextInput.defaultProps || {}
    TextInput.defaultProps.allowFontScaling = false
    super(props);
    this.state = {
      isConnected: null,
      showHoldPopUp: false,
    };
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  backAction = async () => {
    if (store.getState().login.isLoggedIn == false) {
      this.setState({
        showHoldPopUp: true,
      });
    } else {
      BackHandler.exitApp();
    }
  };

  render() {
    const { showHoldPopUp } = this.state;
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                  barStyle={
                    Platform.OS === 'ios' ? 'dark-content' : 'light-content'
                  }
                  backgroundColor={
                    Platform.OS === 'ios' ? Colors.ui_grey_05 : Colors.ui_grey_10
                  }
                />
                <Routes />
              </SafeAreaView>
          </PersistGate>
          <HoldOnPopUp
            visible={showHoldPopUp}
            onRequestClose={() => {
              this.setState({
                showHoldPopUp: false,
              });
            }}
            onRequestClear={() => {
              this.setState({
                showHoldPopUp: false,
              });
              BackHandler.exitApp();
            }}
          />          
          <FlashMessage />

        </Provider>
    );
  }
}

export default App;
