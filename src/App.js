import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from 'react-chartjs-2';
import Data from './datos_cosmomision_2.json';
import { useMemo } from "react";
import './app.css';

Chart.register(CategoryScale);

function GraphContainer ({ name, data, labels, ...props }) {
  return <div className="line-graph">
    <Line
      width="100%"
      height="100%"
      datasetIdKey='id'
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false, // Set to false to allow the chart to be responsive
        responsive: true,
      }}
      data={{
        labels: labels,
        datasets: [
          {
            id: 1,
            label: name,
            data: data,
          },
        ],
      }}
    />
  </div>
}

function MetricTag ({ label, amount, color }) {
  return <div className="metric-tag" style={{ backgroundColor: '#EBF2FA' }}>
    <div className="metric-tag-title">
      <p>{label}:  {amount}</p>
    </div>
  </div>
}

function App() {
  const temperature = useMemo(() => Data.map(d => d.temperature));
  const pressure = useMemo(() => Data.map(d => d.pressure));
  const altitude = useMemo(() => Data.map(d => d.altitude));
  const humidity = useMemo(() => Data.map(d => d.humidity));
  const ax = useMemo(() => Data.map(d => d.ax));
  const ay = useMemo(() => Data.map(d => d.ay));
  const az = useMemo(() => Data.map(d => d.az));
  const timeLables = useMemo(() => Array.from({ length: Data.length }, (_, index) => index + 1));

  const getFileName = () => {
    return "datos_cosmomision_2-" + Date.now();
  };

  const confirmDownload = (format) => () => {
    return window.confirm(`Quieres descargar los datos en formato ${format}?`);
  }

  return <div className="container">
    <div className="top-margin"/>
    <div className="logo-container">
      <img className="logo" src={'/cosmo-graphs/logo.png'} />
    </div>
    <div className="title">
      <div className="title-f-div">
        <h2>Lecturas de los sensores de la carga útil durante la misión del sábado 13 de enero del 2024</h2>
        <br />
        <h4>Cosmoblastos</h4>
        <br />
        <h5>2024</h5>
      </div>
    </div>
    <div className="metrics">
      <div className="metrics-f-div">
        <MetricTag label={"Paquetes de datos recolectados"} amount={Data.length} color={'#579CCE'}/>
        <MetricTag label={"Gráfica"} amount={"métrica / tiempo (s)"} color={'#A5BE00'}/>
      </div>
    </div>
    <div className="graph-container">
      {/* <div style={{ height: '500px', minWidth: '70%' }}>
        <Line
          datasetIdKey='id'
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          data={{
            labels: timeLables,
            datasets: [
              {
                id: 1,
                label: "ax",
                data: ax,
              },
              {
                id: 2,
                label: "ay",
                data: ay,
              },
              {
                id: 3,
                label: "az",
                data: az,
              },
            ],
          }}
        />
      </div> */}
      <GraphContainer name="Altitud" data={altitude} labels={timeLables}/>
      <GraphContainer name="Temperatura" data={temperature} labels={timeLables}/>
      <GraphContainer name="Presión Atmosférifa" data={pressure} labels={timeLables}/>
      <GraphContainer name="Aceleración X" data={ax} labels={timeLables}/>
      <GraphContainer name="Humedad" data={humidity} labels={timeLables}/>
    </div>
    <div className="floating-menu">
      <div className='floating-menu-buttons-container'>
        <a
          className="download-button" 
          href="/cosmo-graphs/datos_cosmomision_2.json" 
          download={getFileName()} 
          onClick={confirmDownload("JSON")}>
            Descargar datos (JSON)
        </a>
        <a 
          className="download-button db-secondary" 
          href="/cosmo-graphs/datos_cosmomision_2.csv" 
          onClick={confirmDownload("CSV")}>
            Descargar datos (CSV)
        </a>
      </div>
    </div>
  </div>
}

export default App;
