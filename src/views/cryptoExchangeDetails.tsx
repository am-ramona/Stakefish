import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExchangeById } from "../network/apis";
import { ExchangeID, ExchangeDetails } from "../utils/types";

export default function CryptoExchangeDetails() {
    let navigate = useNavigate();
    const { id } = useParams<ExchangeID>();
    const [exchangeDetails, setExchangeDetails] = useState<ExchangeDetails | null>(null);

    useEffect(() => {
        async function fetchExchangeDetails() {
            if (id) {
                const data = await getExchangeById(id);
                setExchangeDetails(data as ExchangeDetails);
            }
        }
        fetchExchangeDetails();
    }, [id]);

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    if (exchangeDetails === null) return <p>Loading ...</p>;

    return (
        <section className="padding">
            <code className="center">Exchange details</code>
            <p> name: {exchangeDetails.name}</p>
            <p> Country: {exchangeDetails.country}</p>
            <p> Trust rank: {exchangeDetails.trust_score_rank}</p>
            <span> Logo: <img src={exchangeDetails.image} alt={exchangeDetails.name} /></span>
            <p> Year of establishment: {exchangeDetails.year_established}</p>
            <p> Social media links:
                <a href={exchangeDetails.facebook_url} rel="noreferrer" target="_blank">
                    Facebook
                </a>
                <a href={exchangeDetails.reddit_url} rel="noreferrer" target="_blank">
                    Reddit
                </a>
                <a href={exchangeDetails.telegram_url} rel="noreferrer" target="_blank">
                    Telegram
                </a>
                <a href={exchangeDetails.slack_url} rel="noreferrer" target="_blank">
                    Slack
                </a>
                <a href={exchangeDetails.other_url_1} rel="noreferrer" target="_blank">
                    {(new URL(exchangeDetails.other_url_1) as URL).hostname.replace(/www.|.com/g, matched => '')}
                </a>
                <a href={exchangeDetails.other_url_2} rel="noreferrer" target="_blank">
                    {(new URL(exchangeDetails.other_url_2) as URL).hostname.replace(/www.|.com/g, matched => '')}
                </a>
            </p>
            <p> Description: {exchangeDetails.description}</p>
            {/* <span
                role="button"
                tabindex="0"
                aria-pressed="false"
                aria-label='BackToMainPage'
                onclick=""
                onKeyDown=""
            >Back to main page</span> */}
            <button type='button' onClick={routeChange} className='pointer'>Back to main page</button>
        </section>
    );
}
