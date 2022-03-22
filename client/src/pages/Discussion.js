import React, { useState } from 'react';

const Discussion = () => {
    // const [hotVotes, setHotVotes] = useState(0);
    // const [coldVotes, setColdVotes] = useState(0);
    const [disableHot, setDisableHot] = useState(false);
    const [disableCold, setDisableCold] = useState(false);

    return (
        <section>
            <div>
                <h1>Title: The Lord of the Rings</h1>
                <h2>Year: 1978</h2>
            </div>
            <div>
                <img></img>
                <p>
                Plot: The Fellowship of the Ring embark on a journey to destroy the One Ring and end Sauron's reign over Middle-earth. 
                </p>
            </div>
            <div>
                <button disabled={disableHot} onClick={() => (setDisableHot(true), setDisableCold(false))}>HOT</button>
                <button disabled={disableCold} onClick={() => (setDisableCold(true), setDisableHot(false))}>NOT</button>
            </div>
            <div>
                <h3>
                    User Reviews
                </h3>
                <p>
                    "Lorem ipsum bo diddley protego wingarium haberdashery cauliflower."
                </p>
                <p>
                    Reviewed by username on 01/01/2022
                </p>
            </div>
        </section>
    )
}

export default Discussion;