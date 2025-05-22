// @ts-nocheck

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherData {
  regionName: String;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  description: string;
  clouds: string;
  visibility: string;
  sunrise: string;
  sunset: string;
  icon?: string;
  timezone: string;
}

interface WeatherCardGridProps {
  regionName: string;
  weatherData: WeatherData;
}

const degToCardinal = (deg: number): string => {
  const directions = ['Nord', 'Nord-Est', 'Est', 'Sud-Est', 'Sud', 'Sud-Ouest', 'Ouest', 'Nord-Ouest'];
  return directions[Math.round(deg / 45) % 8];
};


const WeatherCardGrid: React.FC<WeatherCardGridProps> = ({ regionName, weatherData }) => {
  return (
    <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto p-3 custom-scrollbar bg-gray-200">
      <Card className="bg-gradient-to-l from-yellow-500 to-orange-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-">
          <CardTitle className="text-sm font-medium">Région :</CardTitle>
          
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{regionName}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-blue-300 via-white to-orange-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Actuellement</CardTitle>
        </CardHeader>
        <CardContent>
          {weatherData.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="Icône météo"
              className="w-12 h-12"
            />
          )}
          <p className="text-xs text-black">
            Lever du soleil : {new Date(weatherData.sunrise * 1000).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p className="text-xs text-black">
            Coucher du soleil : {new Date(weatherData.sunset * 1000).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p className="text-xs text-black">Timezone : GMT+{weatherData.timezone}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-l from-yellow-500 to-orange-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-">
          <CardTitle className="text-sm font-medium">Température</CardTitle>
          🌡️
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weatherData.temperature} °C</div>
          <p className="text-xs text-black">Ressenti : {weatherData.feelsLike} °C</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-l from-blue-500 to-blue-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidité</CardTitle>
          <span className="text-x1">💧</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weatherData.humidity} %</div>
          <p className="text-xs text-black"> Ressenti :
            {weatherData.humidity < 30
              ? " Peu humide"
              : weatherData.humidity < 60
              ? " Humidité modérée"
              : weatherData.humidity < 80
              ? " Humide"
              : " Très humide"}
          </p>
        </CardContent>
      </Card>


      <Card className="bg-gradient-to-tr from-gray-300 to-gray-100 shadow-md rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-gray-800">Pression</CardTitle>
          <span className="text-xl">📈</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{weatherData.pressure} hPa</div>
          <p className="text-xs text-gray-700">
            {weatherData.pressure < 1000
              ? "Pression basse"
              : weatherData.pressure <= 1020
              ? "Pression normale"
              : "Pression élevée"}
          </p>
        </CardContent>
      </Card>


      <Card className="bg-gradient-to-l from-amber-300 to-amber-100 shadow-md rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold text-gray-800">Vent</CardTitle>
          <span className="text-xl">💨</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{weatherData.windSpeed} m/s</div>
          <p className="text-xs text-gray-700 mb-1">
            {weatherData.windSpeed < 2
              ? "Très léger"
              : weatherData.windSpeed < 5
              ? "Modéré"
              : weatherData.windSpeed < 10
              ? "Soutenu"
              : "Fort vent"}
          </p>
          <p className="text-xs text-gray-700">
            Direction : {degToCardinal(weatherData.windDirection)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-t from-gray-500 to-gray-200 shadow-md rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-800">Nébulosité</CardTitle>
          <span className="text-xl">☁</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{weatherData.clouds} %</div>
          <p className="text-xs text-gray-700 mb-1">
            {weatherData.clouds < 20
              ? "Ciel dégagé"
              : weatherData.clouds < 50
              ? "Partiellement nuageux"
              : weatherData.clouds < 80
              ? "Nuageux"
              : "Très nuageux"}
          </p>
          <p className="text-xs text-gray-700">
            Visibilité : {(weatherData.visibility / 1000).toFixed(1)} km
          </p>
        </CardContent>
      </Card>

    </div>
  );
};

export default WeatherCardGrid;
