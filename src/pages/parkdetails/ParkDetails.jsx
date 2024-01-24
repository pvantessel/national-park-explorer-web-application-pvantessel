import './ParkDetails.css';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
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
                const response = await axios.get('https://developer.nps.gov/api/v1/parks', {
                    params: {
                        parkCode: id,
                        limit: 500,
                        api_key: apiKey,
                    },
                    signal: controller.signal,
                });

                if (response.data.data && response.data.data.length > 0) {
                    setParkDetails(response.data.data[0]);
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
            <section className='parkdetails-inner-container'>

                <article className='park-details-header'>
                    <h2>{parkDetails.fullName}</h2>
                </article>

                <article className='park-details-description'>
                    <h3>Short description:</h3>
                    <h4>{parkDetails.description}</h4>
                </article>

                <article className='park-details-address'>
                    <h3>Contact:</h3>
                    {parkDetails.addresses && parkDetails.addresses.length > 0 && (
                        parkDetails.addresses.map((address, index) => (
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
                    {parkDetails.contacts.phoneNumbers && parkDetails.contacts.phoneNumbers.length > 0 && (
                        parkDetails.contacts.phoneNumbers.map((phone, index) => (
                            <h5 key={index}>{phone.phoneNumber} ( {phone.type} )</h5>
                        ))
                    )}
                    <br/>
                    {parkDetails.contacts.emailAddresses && parkDetails.contacts.emailAddresses.length > 0 && (
                        parkDetails.contacts.emailAddresses.map((email, index) => (
                            <h5 key={index}>
                                ( email ) <br/>
                                <a href={`mailto:${email.emailAddress}`}>{email.emailAddress}</a>
                            </h5>
                        ))
                    )}
                    <br/>
                    <h5>
                        (Route url) <br/>
                        <a href={parkDetails.directionsUrl} target="_blank" rel="noopener noreferrer">
                            {parkDetails.directionsUrl}
                        </a>
                    </h5>
                    <br/>
                    <h5>
                        ( website ) <br/>
                        <a href={parkDetails.url} target="_blank" rel="noopener noreferrer">
                            {parkDetails.url}
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

export default ParkDetails;
