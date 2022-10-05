import React from "react";
import zeroStar from '../images/zero-blue.png';
import halfStar from '../images/half.png';
import oneStar from '../images/one.png';
import oneHalfStar from '../images/one-and-half.png';
import twoStar from '../images/two.png';
import twoHalfStar from '../images/two-and-half.png';
import threeStar from '../images/three.png';
import threeHalfStar from '../images/three-and-half.png';
import fourStar from '../images/four.png';
import fourHalfStar from '../images/four-and-half.png';
import fiveStar from '../images/five.png';

const StarsRating = (obj)=> {
    const rate = parseInt(obj.rate, 10);
    if (rate === 0) {
        return(
            <img src={zeroStar} alt="zeroStar" />
        )
    } else if (rate >= 0 && rate <= 10) {
        return(
            <img src={halfStar} alt="halfStar" />
        )
    } else if (rate >= 10 && rate <= 20) {
        return(
            <img src={oneStar} alt="oneStar" />
        )
    } else if (rate >= 20 && rate <= 30) {
        return(
            <img src={oneHalfStar} alt="oneHalfStar" />
        )
    } else if (rate >= 30 && rate <= 40) {
        return(
            <img src={twoStar} alt="twoStar" />
        )
    } else if (rate >= 40 && rate <= 50) {
        return(
            <img src={twoHalfStar} alt="twoHalfStar" />
        )
    } else if (rate >= 50 && rate <= 60) {
        return(
            <img src={threeStar} alt="threeStar" />
        )
    } else if (rate >= 60 && rate <= 70) {
        return(
            <img src={threeHalfStar} alt="threeHalfStar" />
        )
    } else if (rate >= 70 && rate <= 80) {
        return(
            <img src={fourStar} alt="fourStar" />
        )
    } else if (rate >= 80 && rate <= 90) {
        return(
            <img src={fourHalfStar} alt="fourHalfStar" />
        )
        
    }else if (rate >= 90 && rate <= 100) {
        return(
            <img src={fiveStar} alt="fourHalfStar" />
        )
        
    }else {
        return(
            <img src={zeroStar} alt="error-star" />
        )
    }
}

export default StarsRating;