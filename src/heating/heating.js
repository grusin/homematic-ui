import React, { Component } from 'react';
import * as ons from 'onsenui'
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import ChangeTemp from './changetemp.js'
import App from '../index.js'

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import BaseComponent from '../BaseComponent.js';

class Heating extends BaseComponent {
  constructor(props) {
    super(props);
    
    this.state.ui.toolbar.name = "Heating";
    this.state.ui.toolbar.showBackButton = false;
    this.state.rooms = [];
  }

  componentNeedsData(done) {
    App.Api_GetRooms().then(data => {
      this.setState({ rooms: data });
      if (done != null)
        done();
    }
    );
  }

  renderPage() {
    return (
      <Ons.List
        renderHeader={() => { this.renderHeader }}
        dataSource={this.state.rooms}
        renderRow={this.renderRow.bind(this)}
      />);
  }

  renderRow(row) {
    return (
      <Ons.List key={row.ISEID}>
        <Ons.ListHeader>{row.Name}</Ons.ListHeader>
        <Ons.ListItem expandable>
          <div className="left">
            <Ons.Button modifier="large--cta" disabled onClick={this.gotoComponent.bind(this, ChangeTemp, row)} style={{ width: "110px" }}>
              {row.ActualTempAvg.toFixed(1)}&#8451;
                  &nbsp;<Ons.Icon icon="fa-thermometer-empty" />
            </Ons.Button>

            <Ons.Button modifier="large--cta" disabled style={{ width: "110px" }}>
              {row.SetTemp.toFixed(1)}&#8451;
                  &nbsp;<Ons.Icon icon="fa-star" />
            </Ons.Button>

            {row.HumidityAvg > 0 &&
              <Ons.Button modifier="large--cta" disabled style={{ width: "110px" }}>{row.HumidityAvg}%&nbsp;<Ons.Icon icon="fa-tint" /></Ons.Button>
            }

            {row.HeatingActive == true &&
              <Ons.Button modifier="large--cta" disabled style={{ width: "50px" }}><Ons.Icon icon="fa-fire" /> </Ons.Button>
            }

            {row.BoostActive == true &&
              <Ons.Button modifier="large--cta" disabled style={{ width: "50px" }}><Ons.Icon icon="fa-rocket" /> </Ons.Button>
            }

            {row.DehumidifierActive == true &&

              <Ons.Button modifier="large--cta" disabled style={{ width: "50px" }}><Ons.Icon icon="fa-cloud" /> </Ons.Button>

            }
          </div>
          <div className="right">
            <Ons.Button modifier="large--cta" onClick={this.gotoComponent.bind(this, ChangeTemp, { ISEID: row.ISEID})} style={{ width: "50px" }}><Ons.Icon icon="fa-wrench" /></Ons.Button>
          </div>
          <div className="expandable-content">
            Set Temp: {row.SetTemp}&#8451;<br />
            Window Open: {row.WindowOpen ? 'Yes' : 'No'} <br />
            Actual Temp (Min/Avg/Max): {row.ActualTempMin}&#8451; / {row.ActualTempAvg}&#8451; / {row.ActualTempMax}&#8451;<br />
            Humidity (Min/Avg/Max): {row.HumidityMin}% / {row.HumidityAvg}% / {row.HumidityMax}%<br />
            Valve Open (Min/Avg/Max): {row.ValveOpenMin}% / {row.ValveOpenAvg}% / {row.ValveOpenMax}%<br />
          </div>
        </Ons.ListItem>
      </Ons.List>
    );
  }
}

export default Heating;

/*
class HeatingOld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [], ui: { toolbar: { name: "", showBackButton: false } } };

    this.state.ui.toolbar.name = "Heating";
    this.state.ui.toolbar.showBackButton = false;

    console.log(this.state);
  }

  componentDidMount() {
    this.pullHookLoad(null);
  }

  gotoComponent(component, key) {
    this.props.navigator.pushPage({ comp: component, props: key });
  }

  pullHookChange(event) {
    this.setState({
      pullHookState: event.state
    });
  }

  pullHookLoad(done) {
    App.Api_GetRooms().then(data => {
      this.setState({ rooms: data });
      if (done != null)
        done();
    }
    );
  }

  renderPullHook() {
    switch (this.state.pullHookState) {
      case 'action':
        return <div>Loading...<br /><Ons.Icon icon='spinner' spin /></div>;
      default:
        return;
    }
  }

  renderToolbar() {
    return (<Ons.Toolbar>
      {this.state.ui.toolbar.showBackButton == true &&
        <div className='left'>
          <Ons.BackButton>Back</Ons.BackButton>
        </div>
      }
      <div className='center'>{this.state.ui.toolbar.name}</div>
    </Ons.Toolbar>
    );
  }

  renderBody() {
    return (
      <Ons.List
        renderHeader={() => { this.renderHeader }}
        dataSource={this.state.rooms}
        renderRow={this.renderRow.bind(this)}
      />);
  }

  renderRow(row) {
    console.log(row);

    return (
      <Ons.List key={row.ISEID}>
        <Ons.ListHeader>{row.Name} - {row.Timestamp}</Ons.ListHeader>
        <Ons.ListItem expandable>
          <div className="left">


            <Ons.Button modifier="large--cta" onClick={this.gotoComponent.bind(this, ChangeTemp, row)}>
              {row.ActualTempAvg.toFixed(1)}&#8451;
                &nbsp;<Ons.Icon icon="fa-thermometer-empty" />
            </Ons.Button>

            <Ons.Button modifier="large--cta" disabled>
              {row.SetTemp.toFixed(1)}&#8451;
                &nbsp; <Ons.Icon icon="fa-star" />
            </Ons.Button>

            {row.HumidityAvg > 0 &&
              <Ons.Button modifier="large--cta" disabled>{row.HumidityAvg}%&nbsp;<Ons.Icon icon="fa-tint" /></Ons.Button>
            }

            {row.HeatingActive == true &&
              <Ons.Button modifier="large--cta" disabled style={{ width: "50px" }}><Ons.Icon icon="fa-fire" /> </Ons.Button>
            }

            {row.BoostActive == true &&
              <Ons.Button modifier="large--cta" disabled style={{ width: "50px" }}><Ons.Icon icon="fa-rocket" /> </Ons.Button>
            }

            {row.DehumidifierActive == true &&

              <Ons.Button modifier="large--cta" disabled style={{ width: "50px" }}><Ons.Icon icon="fa-cloud" /> </Ons.Button>

            }
          </div>
          <div className="expandable-content">
            Set Temp: {row.SetTemp}&#8451;<br />
            Window Open: {row.WindowOpen ? 'Yes' : 'No'} <br />
            Actual Temp (Min/Avg/Max): {row.ActualTempMin}&#8451; / {row.ActualTempAvg}&#8451; / {row.ActualTempMax}&#8451;<br />
            Humidity (Min/Avg/Max): {row.HumidityMin}% / {row.HumidityAvg}% / {row.HumidityMax}%<br />
            Valve Open (Min/Avg/Max): {row.ValveOpenMin}% / {row.ValveOpenAvg}% / {row.ValveOpenMax}%<br />
          </div>

        </Ons.ListItem>
      </Ons.List>
    );
  }

  render() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
        <Ons.PullHook onChange={this.pullHookChange.bind(this)} onLoad={this.pullHookLoad.bind(this)}>
          {this.renderPullHook()}
        </Ons.PullHook>
        {this.renderBody()}
      </Ons.Page>
    );
  }
}
*/

