import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import SelectAddress from './component/selectAddress'

class App extends React.Component{
  constructor(){
    super();
    this.state={
      isShowSelectAddressBox:false,
      curCityData: {
        province: '--',
        city: '--',
        district: '--',
      },
    }
  }

  toggleSelAddress=() => {
    this.setState(pre => ({
      isShowSelectAddressBox: !pre.isShowSelectAddressBox,
    }));
  }

  saveSelectCityDb=(db) => {
    this.setState({
      curCityData: {
        province: db.province.name,
        city: db.city.name,
        district: db.district.name,
      },
    });
    this.toggleSelAddress();
  }

  render(){
    return(
      <div>
        <section onClick={this.toggleSelAddress}>
          <div>点击文字弹出地区选择框</div>
          <span>{this.state.curCityData.province} | {this.state.curCityData.city} | {this.state.curCityData.district}</span>
        </section>
        <SelectAddress isShow={this.state.isShowSelectAddressBox} toggleSelAddress={this.toggleSelAddress} saveSelectCityDb={this.saveSelectCityDb}/>
      </div>
    )
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);