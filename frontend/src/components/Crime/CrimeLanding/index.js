import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { fetchCrimeLandingSampleThunk } from '../../../store/crime.js'
import CrimeSearch from '../CrimeSearch/index.js'

import './crimeLanding.css';

function CrimeLanding() {

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  


  // useSelectors
  const crimeIncidentsPerYear = useSelector(
    state => state.crime?.crimeData?.IncidentsPerYear
  );

  const crimeAveragePerYear = useSelector(
    state => state.crime?.crimeData?.AverageSentencePerYear
  );

  const crimeProbationPerYear = useSelector(
    state => state.crime?.crimeData?.yearlyProbationAverageAll
  )

  const incarcerationPercentage = useSelector(
    state => state.crime?.crimeData?.IncarcerationPercentage
  )

  const probationPercentage = useSelector(
    state => state.crime?.crimeData?.probationPercentage
  )
  const crimeName = useSelector(state => state.crime?.crimeData?.Offense)

  const grandTotalIncarceration = useSelector(state => state.crime?.crimeData?.averageIncarceration)

  const grandTotalProbation = useSelector(state => state.crime?.crimeData?.averageProbation)

  // summarized stuff

  const averageIncarceration = useSelector(state => state.crime?.AverageIncarcerationDays
  )
  const minSentenceDays
    = useSelector(state => state.crime?.MinSentenceDays
    )
  const maxSentenceDays = useSelector(state => state.crime?.MaxSentenceDays)
  const sdIncarceration = useSelector(state => state.crime?.StdDevSentence)

  const totalCases = useSelector(state => state.crime?.TotalCasesDays
  )

  const averageProbation = useSelector(state => state.crime?.AverageProbationMonth)
  const maxProbation = useSelector(state => state.crime?.MaxProbationMonth)
  const minProbation = useSelector(state => state.crime?.MinProbationMonth)
  const sdProbation = useSelector(state => state.crime?.StdDevProbationMonth)

  useEffect(() => {
    dispatch(fetchCrimeLandingSampleThunk()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return <p>wait a bloody minute...</p>;
  }

  // incidents per year have no choice but to repeat self
  const chartDataIncidents = Object.entries(crimeIncidentsPerYear)
    .map(([year, count]) => ({
      year: year.replace("Year ", ""),
      count
    }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  // average per year have no choice but to repeat self
  const chartDataYearlyAverage = Object.entries(crimeAveragePerYear)
    .map(([year, count]) => ({
      year: year.replace("Year ", ""),
      count
    }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  // average probation per year

  const chartDataYearlyProbation = Object.entries(crimeProbationPerYear)
    .map(([year, count]) => ({
      year: year.replace("Year ", ""),
      count
    }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  // incarceration probation percentage

  // Incarceration vs Probation Percentage
  const chartDataSentencingPercentage = Object.keys(incarcerationPercentage)
    .sort(
      (a, b) =>
        Number(a.replace("Year ", "")) - Number(b.replace("Year ", ""))
    )
    .map((year) => ({
      year: year.replace("Year ", ""),
      incarceration: incarcerationPercentage[year],
      probation: probationPercentage[year],
    }));

  const pieData = [
    {
      name: "Incarceration",
      value: grandTotalIncarceration
    },
    {
      name: "Probation",
      value: grandTotalProbation
    }
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <div className="mainCrimeLanding">
      <CrimeSearch />
      <div className='CrimeLandingHeaderDiv1'>
      <h1 className="crimeLandingHeader">Crime Du Jour: {crimeName}</h1>
       <h3 className="crimeLandingHeaderBelow">nota bene you can be sentenced to both incarceration and probation or to neither ie just fines.</h3>
       <h3 className="crimeLandingHeaderBelow">Thus percentage numbers might be above or below 100 percent.</h3>
    </div>

      <section className="crimeLandingGraphsSection">
        {/* Incidents */}
        <div className='crimeLandingGraphDiv'>
          <h3>Incidents per Year</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDataIncidents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Yearly Average */}
        <div className='crimeLandingGraphDiv'>
          <h3>Average Incarceration per Year</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDataYearlyAverage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Yearly Probation */}
        <div className='crimeLandingGraphDiv'>
          <h3>Average Probation per Year</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDataYearlyProbation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

         <div className="crimeLandingGraphDiv">
          <h3>Sentencing vs Probation Total</h3>
         
          <h5>This just shows the ratio it could be above 100 percent or below</h5>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* probation vs incarceration percentage */}
        <div className='crimeLandingGraphDiv crimeLandingGraphDivWide'>
          <h3>Incarceration vs Probation Percentage</h3>
       

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartDataSentencingPercentage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value) => `${Number(value).toFixed(2)}%`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="incarceration"
                name="Incarceration"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="probation"
                name="Probation"
                stroke="#82ca9d"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

       
      </section>

      <section className="crimeLandingSummarySection">
        <h2>Summarized Statistics for {crimeName}</h2>
        <div className="crimeLandingSummaryGrid">
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Total Cases</p>
            <p className="crimeLandingSummaryValue">{totalCases}</p>
          </div>
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Average Incarceration</p>
            <p className="crimeLandingSummaryValue">{averageIncarceration}</p>
          </div>
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Max Incarceration</p>
            <p className="crimeLandingSummaryValue">{maxSentenceDays}</p>
          </div>
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Min Incarceration</p>
            <p className="crimeLandingSummaryValue">{minSentenceDays}</p>
          </div>
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Std. Dev. Incarceration</p>
            <p className="crimeLandingSummaryValue">{sdIncarceration}</p>
          </div>
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Average Probation</p>
            <p className="crimeLandingSummaryValue">{averageProbation}</p>
          </div>
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Max Probation</p>
            <p className="crimeLandingSummaryValue">{maxProbation}</p>
          </div>
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Min Probation</p>
            <p className="crimeLandingSummaryValue">{minProbation}</p>
          </div>
          <div className="crimeLandingSummaryCard">
            <p className="crimeLandingSummaryLabel">Std. Dev. Probation</p>
            <p className="crimeLandingSummaryValue">{sdProbation}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CrimeLanding;