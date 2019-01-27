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
                content: <Heating key="alarm" navigator={this.props.navigator} />,
                tab: <Tab key="alarm" label="alarm" icon="ion-ios-home-outline" />
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
       // route.props = route.props;
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
        return "http://127.0.0.1:4000"; 
        //return "";
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

    static Api_GetAlarm()
    {
        return fetch(App.getApiUrl() + "/api/alarm").then(response => response.json())
    }

    static Api_SetAlarmArmed()
    {
        return fetch(App.getApiUrl() + "/api/alarm/arm").then(response => response.json())
    }

    static Api_SetAlarmDisarmed(code)
    {
        return fetch(App.getApiUrl() + "/api/alarm/disarm/" + code).then(response => response.json())
    }
}
export default App;

//this gets executed on startup
ons.disableAutoStyling()
ons.platform.select('ios')
ReactDOM.render(<App />, document.getElementById('root'));