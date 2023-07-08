import React, {useEffect, useState} from "react";
import Breadcrumbs from "@/modules/BreadcrumbsModule/BreadCrumbsModule.tsx";
import {useParams} from "react-router";
import config from "@/config/config.ts";
import {Chart} from "primereact/chart";

const NeoDetails: React.FC = () => {

    const {id} = useParams();
    const [neoDetails, setNeoDetails] = useState(null);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        // setChartData(data);
        setChartOptions(options);
    }, []);

    const prepareChartData = (data) => {
        return {
            labels: data.map((item) => item.close_approach_date),
            datasets: [
                {
                    label: 'Close Approaches',
                    data: data.map((item) => item.miss_distance.kilometers),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                    ],
                    borderWidth: 1
                }
            ]
        }
    }


    useEffect(() => {
        const fetchNeoDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${config.NASA_API_KEY}`
                );
                const data = await response.json();
                setNeoDetails(data);

                setChartData(prepareChartData(data.close_approach_data));
            } catch (error) {
                console.error('Error fetching NEO item details:', error);
            }
        };

        fetchNeoDetails();
    }, [id]);

    return (
        <div>
            <Breadcrumbs/>
            <h1>Neo Details</h1>
            <div className="card">
                <Chart type="bar" data={chartData} options={chartOptions}/>
            </div>
        </div>
    );
}

export default NeoDetails;