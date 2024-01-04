import './ParkDetails.css';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function ParkDetails() {
    const {id} = useParams();
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';
    const [parkDetails, setParkDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchParkDetails() {
            try {
                const response = await axios.get('https://developer.nps.gov/api/v1/parks?limit=500', {
                    params: {
                        parkId: id,
                        api_key: apiKey,
                    },
                    signal: controller.signal,
                });

                if (response.data.data && response.data.data.length > 0) {
                    setParkDetails(response.data.data[0]);
                    console.log('log1')
                } else {
                    setError(true);
                    console.log('log2')
                }

                console.log(parkDetails);
                console.log(response.data);
                console.log(response.data.data);
                console.log(response.data.data[0]);
                console.log(response.data.data[1]);

                setLoading(false);
            } catch (e) {
                console.error(e);
                setError(true);
                setLoading(false);
            }
        }

        void fetchParkDetails();

        return function cleanup() {
            controller.abort(); // <--- request annuleren
            console.log('unmount effect is triggered');
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Er ging iets mis bij het ophalen van parkdetails...</p>;
    }

    return (
        <main className='parkdetails-outer-container'>
            <div>
                <h1>{parkDetails.fullName}</h1>
                <p>{parkDetails.description}</p>
                <p>{parkDetails.id}</p>

            </div>
        </main>
    );
}

export default ParkDetails;
