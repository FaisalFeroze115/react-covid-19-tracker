import React from 'react'
// import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import {showDataOnMap} from './util.js';

const MapSection = ({countries, center, zoom}) => {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries)}
            </MapContainer>
            
        </div>
    )
}

export default MapSection
