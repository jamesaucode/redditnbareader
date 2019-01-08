import React from 'react'
import tickIcon from '../image/tick.png'; 
import { capitalizeFirstLetter } from '../Helper';

const DropDownOption = (props) => {
      const { currentFilter, filter, onChangeFilterClick } = props;
        return (
            <div onClick={onChangeFilterClick} className="option">
                {
                    currentFilter === filter ?
                        <img alt="tick icon" className="icon--wide" src={tickIcon}></img>
                        :
                        <div className="icon--wide"></div>
                }
                <span>{capitalizeFirstLetter(filter)}</span>
            </div>
        )
}

export default DropDownOption;
