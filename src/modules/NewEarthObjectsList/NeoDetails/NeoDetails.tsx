import React, {useEffect, useState} from "react";
import Breadcrumbs from "@/modules/BreadcrumbsModule/BreadCrumbsModule";
import {useParams} from "react-router";
import globalConfig from "@/config/config";
import {Chart} from "primereact/chart";
import {INeoSingleItem} from "@/modules/NewEarthObjectsList/types/INeoSingleItem";
import {INeoCloseApproach} from "../types/INeoCloseApproach";

const NeoDetails: React.FC = (): React.ReactElement => {

    const {id} = useParams();
    const [neoDetails, setNeoDetails] = useState<INeoSingleItem | null>(null);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [loading, setLoading] = useState<boolean>(false);

    const prepareChartData = (data: INeoCloseApproach[]) => {
        const colors = [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
        ];

        let maxDistance: number = data.length > 0 ? parseFloat(data[0].miss_distance.kilometers) : 0;
        let maxIndex = 0;

        for (let i = 1; i < data.length; i++) {
            const distance = parseFloat(data[i].miss_distance.kilometers);
            if (distance > maxDistance) {
                maxDistance = distance;
                maxIndex = i;
            }
        }

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartOptions(options);

        return {
            labels: data.map((item: INeoCloseApproach) => item.close_approach_date),
            datasets: [
                {
                    label: 'Close Approaches',
                    data: data.map((item: INeoCloseApproach) => item.miss_distance.kilometers),
                    backgroundColor: data.map((_, index: number) => {
                        if (index === maxIndex) {
                            return 'rgba(255, 0, 0, 0.2)';
                        }
                        return colors[index % colors.length];
                    }),
                    borderColor: data.map((_, index: number) => {
                        if (index === maxIndex) {
                            return 'rgb(255, 0, 0)';
                        }
                        return colors[index % colors.length];
                    }),
                    borderWidth: 1,
                },
            ],
        };
    };

    useEffect(() => {
        const fetchNeoDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${globalConfig.NASA_API_KEY}`
                );
                const responseData = await response.json();
                const data: INeoSingleItem = responseData;
                setNeoDetails(data);
                setChartData(prepareChartData(data.close_approach_data));
                setLoading(true);
            } catch (error) {
                console.error('Error fetching NEO item details:', error);
            }
        };

        fetchNeoDetails();
    }, [id]);


    return (
        <>
            {loading && neoDetails !== null ? (
                <div>
                    <Breadcrumbs/>
                    <h1>Neo Details</h1>
                    <h5>Name of the NEO: {neoDetails?.name}</h5>
                    <div className="card">
                        <span>Chart of all close approaches</span>
                        <Chart type="bar" data={chartData} options={chartOptions}/>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default NeoDetails;