import React from 'react';
import { PropTypes } from 'prop-types';
import './style.scss'

export default class SelectAddress extends React.Component {
  localList = require('./localList')

  static propTypes={
    isShow: PropTypes.bool.isRequired,
    toggleSelAddress: PropTypes.func.isRequired,
    saveSelectCityDb: PropTypes.func.isRequired,
  };

  tempCityDb = {
    province: {
      name: '',
      index: 0,
    },
    city: {
      name: '',
      index: 0,
    },
    district: {
      name: '',
      index: 0,
    },
  }

  state={
    citysDb: {
      province: '',
      citys: '',
      district: [],
    },
  }

  chageIsDefaultAddress =() => {
    this.setState(preState => ({
      isDefaultAddress: !preState.isDefaultAddress,
    }));
  }

  componentWillMount() {
    const province = [], citys = [];
    this.localList.State.forEach((v) => {
      province.push(v.Name);
    });
    this.localList.State[0].City.forEach((v) => {
      citys.push(v.Name);
    });
    this.setState({
      citysDb: {
        province,
        citys,
        district: [],
      },
    });
    this.tempCityDb = {
      province: {
        name: province[0],
        index: 0,
      },
      city: {
        name: citys[0],
        index: 0,
      },
      district: {
        name: '',
        index: 0,
      },
    };
  }

  componentDidMount() {
    const provinceDom = document.querySelector('#province');
    const cityDom = document.querySelector('#citys');
    const districtDom = document.querySelector('#district');
    const baseFontSize = 50;  // 滑动基数，同html标签中的font-size同值
    let startY, endY;
    let provinceAllLength = 0, cityAllLength = 0, districtAllLength = 0; // 省、市、区的当前总下标

    const touchMoveEndAction = (endY, startY, domAllLength, objName) => {
      const moveLength = Math.round((endY - startY) / baseFontSize * 1.3);
      //  设置总步长
      const maxStateCityDbItemNum = Number(this.state.citysDb[objName].length - 1);
      if ((moveLength > 0 && domAllLength === maxStateCityDbItemNum) || domAllLength > 0) {
        domAllLength = moveLength - domAllLength;
      } else {
        domAllLength += moveLength;
      }

      let nextDomTop = '', initDomTop = null;
      switch (objName) {
        case 'province':
          initDomTop = Number(provinceDom.style.top.slice(0, -3));
          nextDomTop = Number(moveLength * 0.7) + initDomTop;
          break;
        case 'citys':
          initDomTop = Number(cityDom.style.top.slice(0, -3));
          nextDomTop = Number(moveLength * 0.7) + initDomTop;
          break;
        case 'district':
          initDomTop = Number(districtDom.style.top.slice(0, -3));
          nextDomTop = Number(moveLength * 0.7) + initDomTop;
          break;
        default: break;
      }


      //  拦截滑动效果上边界
      if (nextDomTop >= 0 && (nextDomTop - initDomTop) >= 0) {
        nextDomTop = 0;
        domAllLength = 0;
      }
      if (nextDomTop < 0 && nextDomTop < 0 - maxStateCityDbItemNum * 0.7) {
        nextDomTop = 0 - maxStateCityDbItemNum * 0.7;
        domAllLength = 0 - maxStateCityDbItemNum;
      }
      return [nextDomTop, domAllLength];
    };

    provinceDom.addEventListener('touchstart', (event) => {
      const touch = event.targetTouches[0];
      startY = touch.pageY;
    });
    provinceDom.addEventListener('touchmove', (event) => {
      const touch = event.targetTouches[0];
      endY = touch.pageY;
    });
    provinceDom.addEventListener('touchend', () => {
      const res = touchMoveEndAction(endY, startY, provinceAllLength, 'province');
      const nextProvinceTop = res[0];
      if (res[1] <= 0) {
        provinceAllLength = Math.abs(res[1]);
      } else {
        provinceAllLength -= res[1];
      }
      provinceDom.style.top = `${nextProvinceTop}rem`;
      cityDom.style.top = '0rem';
      districtDom.style.top = '0rem';
      cityAllLength = 0;
      districtAllLength = 0;
      this.changeProvince(provinceAllLength);
    }, false);


    // 城市变化
    cityDom.addEventListener('touchstart', (event) => {
      const touch = event.targetTouches[0];
      startY = touch.pageY;
    });
    cityDom.addEventListener('touchmove', (event) => {
      const touch = event.targetTouches[0];
      endY = touch.pageY;
    });
    cityDom.addEventListener('touchend', () => {
      let nextProvinceTop = null;
      [nextProvinceTop, cityAllLength] = touchMoveEndAction(endY, startY, cityAllLength, 'citys');
      cityDom.style.top = `${nextProvinceTop}rem`;
      districtDom.style.top = '0rem';
      districtAllLength = 0;
      this.changeCity(Math.abs(cityAllLength));
    }, false);

    // 区域变化
    districtDom.addEventListener('touchstart', (event) => {
      const touch = event.targetTouches[0];
      startY = touch.pageY;
    });
    districtDom.addEventListener('touchmove', (event) => {
      const touch = event.targetTouches[0];
      endY = touch.pageY;
    });
    districtDom.addEventListener('touchend', () => {
      let nextProvinceTop = null;
      [nextProvinceTop, districtAllLength] = touchMoveEndAction(endY, startY, districtAllLength, 'district');
      districtDom.style.top = `${nextProvinceTop}rem`;
      const nowDistrictObj = this.localList.State[this.tempCityDb.province.index].City[this.tempCityDb.city.index].Region[Math.abs(districtAllLength)];
      this.tempCityDb.district.name = nowDistrictObj.Name;
      this.tempCityDb.district.index = Math.abs(districtAllLength);
    }, false);
  }

  changeProvince=(index) => {
    const citys = [];
    this.localList.State[index].City.forEach((v) => {
      citys.push(v.Name);
    });
    this.tempCityDb.province.name = this.localList.State[index].Name;
    this.tempCityDb.province.index = index;
    const district = [];
    const regionArr = this.localList.State[index].City[0].Region;
    if (regionArr) {
      regionArr.forEach((v) => {
        district.push(v.Name);
      });
      this.tempCityDb.district.name = this.localList.State[index].City[0].Region[0].Name || '';
    } else {
      this.tempCityDb.district.name = '';
    }

    this.tempCityDb.district.index = 0;
    this.tempCityDb.city.name = this.localList.State[index].City[0].Name;
    this.tempCityDb.city.index = 0;

    this.setState(pre => ({
      citysDb: {
        province: pre.citysDb.province,
        citys,
        district,
      },
    }));
  }

  changeCity=(index) => {
    const district = [];
    const regionArr = this.localList.State[this.tempCityDb.province.index].City[index].Region;
    if (regionArr) {
      regionArr.forEach((v) => {
        district.push(v.Name);
      });
      this.tempCityDb.district.name = this.localList.State[this.tempCityDb.province.index].City[index].Region[0].Name;
      this.tempCityDb.district.index = 0;
    }

    this.tempCityDb.city.name = this.localList.State[this.tempCityDb.province.index].City[index].Name;
    this.tempCityDb.city.index = index;
    this.setState(pre => ({
      citysDb: {
        province: pre.citysDb.province,
        citys: pre.citysDb.citys,
        district,
      },
    }));
  }


  saveSelectCityDb=() => {
    this.props.saveSelectCityDb(this.tempCityDb);
  }

  toggleCityBox=() => {
    this.props.toggleSelAddress();
  }

  render() {
    return (
      <section className="selectFootBox" style={{ display: this.props.isShow ? 'block' : 'none' }}>
        <div className="bg">&nbsp;</div>
        <div className="content">
          <header>
            <span onClick={this.toggleCityBox}>取消</span>
            <span onClick={this.saveSelectCityDb}>确认</span>
          </header>
          <div className="currentSelect">&nbsp;</div>
          <div className="cityUlBox">
            <ul id="province">
              {this.state.citysDb.province.map(v => (<li key={v}>{v}</li>))}
            </ul>
            <ul id="citys">
              {this.state.citysDb.citys.map(v => (<li key={v}>{v}</li>))}
            </ul>
            <ul id="district">
              {this.state.citysDb.district.map(v => (<li key={v}>{v}</li>))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
