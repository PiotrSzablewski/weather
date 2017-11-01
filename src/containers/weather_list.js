import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from '../components/chart'
import GoogleMap from '../components/google_maps'

class WeatherList extends Component {
    renderWeather( cityData ) {
        let temps = cityData.list.map( listItem => {
            let kelvinTemp = listItem.main.temp;
            return ( kelvinTemp - 270 ).toFixed( 0 )
        } );
        let pressures = cityData.list.map( listItem => listItem.main.pressure );
        let humidities = cityData.list.map( listItem => listItem.main.humidity );
        let { lon, lat } = cityData.city.coord;
        console.log( temps );
        return (
            <tr key={ cityData.city.id }>
                <td><GoogleMap lon={ lon } lat={ lat }/></td>
                <td><Chart data={ temps } unit="(°C)" color="orange"/></td>
                <td><Chart data={ pressures } unit="(hPa)" color="red"/></td>
                <td><Chart data={ humidities } unit="(%)" color="blue"/></td>
            </tr>
        )
    }

    render() {

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature (°C)</th>
                    <th>Pressure (hPa)</th>
                    <th>Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                { this.props.weather.map( this.renderWeather ) }
                </tbody>
            </table>
        )
    }
}

function mapStateToProps( { weather } ) {
    return { weather };
}

export default connect( mapStateToProps )( WeatherList );