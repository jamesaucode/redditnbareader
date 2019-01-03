import React, { Component } from 'react'
import tickIcon from '../image/tick.png'; 
import { capitalizeFirstLetter } from '../Helper';

export default class DropDownOption extends Component {
    render() {
        const { currentFilter, filter, onChangeFilterClick } = this.props;
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
}
