import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';

import {
    Page,
    Tabbar,
    Tab,
    Navigator
} from 'react-onsenui';

import Heating from './heating/heating';
import ChangeTemp from './heating/changetemp';
import Lights from './lights/lights';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class Tabs extends React.Component {
    renderTabs() {
        return [
            {
                content: <Heating key="heating" navigator={this.props.navigator} />,
                tab: <Tab key="heating" label="heating" icon="ion-ios-home-outline" />
            },
            {
                content: <Lights key="lights" navigator={this.props.navigator} />,
                tab: <Tab key="lights" label="lights" icon="ion-ios-albums-outline" />
            }
        ];
    }

    render() {
        return (
            <Page>
                <Tabbar
                    renderTabs={this.renderTabs.bind(this)}
                />
            </Page>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.props = this.props;       
    }

    renderPage(route, navigator) {
        route.props = route.props;
        route.props.navigator = navigator;

        return React.createElement(route.comp, route.props);
    }

    render() {
        return (
            <Navigator
                initialRoute={{ comp: Tabs, props: { key: 'tabs' }}}
                renderPage={this.renderPage}
            />
        );
    }

    static getApiUrl()
    {
        return "http://192.168.1.30:9696"; 
    }

    static Api_GetRooms()
    {
        return fetch(App.getApiUrl() + "/api/rooms").then(response => response.json())
    }

    static Api_GetRoom(room_iseid)
    {
        return fetch(App.getApiUrl() + "/api/rooms/" + room_iseid).then(response => response.json())
    }

    static Api_SetRoomTemp(room_iseid, newtemp)
    {
        return fetch(App.getApiUrl() + "/api/rooms/" + room_iseid + "/temp/" + newtemp).then(response => response.json())
    }

    static Api_SetRoomBoost(room_iseid, new_state)
    {
        return fetch(App.getApiUrl() + "/api/rooms/" + room_iseid + "/boostmode/" + new_state).then(response => response.json())
    }    
}
export default App;


ReactDOM.render(<App />, document.getElementById('root'));