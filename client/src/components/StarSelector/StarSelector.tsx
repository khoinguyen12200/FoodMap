import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import './index.scss'


interface StarSelector {
    star: number;
    onChange?: (rating: number) => void;
}

function StarSelector({ star, onChange }: StarSelector) {
    return (
        <div className="StarSelector">
            {[1, 2, 3, 4, 5].map((current) => {
                if (current <= star) {
                    return (
                        <div
                            onClick={() => onChange && onChange(current)}
                            className="star active"
                        >
                            <AiFillStar />
                        </div>
                    );
                } else {
                    return (
                        <div
                            onClick={() => onChange && onChange(current)}
                            className="star"
                        >
                            <AiOutlineStar />
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default StarSelector