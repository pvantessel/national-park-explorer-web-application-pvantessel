import './ActivityDetails.css';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

function ActivityDetails() {
    const {id} = useParams();
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';
    const [activityDetails, setActivityDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
console.log(id);
        async function fetchActivityDetails() {
            try {
                const response = await axios.get('https://developer.nps.gov/api/v1/thingstodo', {
                    params: {
                        id: id,
                        limit: 500,
                        api_key: apiKey,
                    },
                    signal: controller.signal,
                });

                if (response.data.data && response.data.data.length > 0) {
                    setActivityDetails(response.data.data[0]);
                } else {
                    setError(true);
                }

                setLoading(false);
            } catch (e) {
                console.error(e);
                setError(true);
                setLoading(false);
            }
        }

        void fetchActivityDetails();

        return function cleanup() {
            controller.abort(); // <--- request annuleren
            console.log('unmount effect is triggered');
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Er ging iets mis bij het ophalen van activitydetails...</p>;
    }

    return (
        <main className='parkdetails-outer-container'>
            <section className='parkdetails-inner-container'>

                <article className='park-details-header'>
                    <h2>{activityDetails.fullName}</h2>
                </article>

                <article className='park-details-description'>
                    <h3>Short description:</h3>
                    <h4>{activityDetails.description}</h4>
                </article>

                <article className='park-details-address'>
                    <h3>Contact:</h3>
                    {activityDetails.addresses && activityDetails.addresses.length > 0 && (
                        activityDetails.addresses.map((address, index) => (
                            <div key={index}>
                                <h5>( {address.type} address )</h5>
                                {address.line1 && <h5>{address.line1}</h5>}
                                {address.line2 && <h5>{address.line2}</h5>}
                                {address.line3 && <h5>{address.line3}</h5>}
                                <h5>
                                    {address.city && `${address.city}, `}
                                    {address.stateCode && `${address.stateCode} `}
                                    {address.postalCode && `${address.postalCode}`}
                                </h5>
                                <br/>
                            </div>
                        ))
                    )}
                    {activityDetails.contacts.phoneNumbers && activityDetails.contacts.phoneNumbers.length > 0 && (
                        activityDetails.contacts.phoneNumbers.map((phone, index) => (
                            <h5 key={index}>{phone.phoneNumber} ( {phone.type} )</h5>
                        ))
                    )}
                    <br/>
                    {activityDetails.contacts.emailAddresses && activityDetails.contacts.emailAddresses.length > 0 && (
                        activityDetails.contacts.emailAddresses.map((email, index) => (
                            <h5 key={index}>
                                ( email ) <br/>
                                <a href={`mailto:${email.emailAddress}`}>{email.emailAddress}</a>
                            </h5>
                        ))
                    )}
                    <br/>
                    <h5>
                        (Route url) <br/>
                        <a href={activityDetails.directionsUrl} target="_blank" rel="noopener noreferrer">
                            {activityDetails.directionsUrl}
                        </a>
                    </h5>
                    <br/>
                    <h5>
                        ( website ) <br/>
                        <a href={activityDetails.url} target="_blank" rel="noopener noreferrer">
                            {activityDetails.url}
                        </a>
                    </h5>
                </article>
            </section>

            <section className='parkdetails-remark'>
                <div className='parkdetails-remark-content'>
                    <h4 className='parkdetails-style-link'>
                        Terug naar het park overzicht? Klik dan <Link to="/parken">hier</Link>.
                    </h4>
                </div>
            </section>

        </main>
    );
}

export default ActivityDetails;
