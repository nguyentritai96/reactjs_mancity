import React, { Component } from 'react';

import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

class Stripes extends Component {
    state = {
        stripes:[
            {
                backgroundColor:'#98c5e9',
                left: 120,
                top: -260 ,
                rotate: 25,
                delay: 0
            },
            {
                backgroundColor:'#ffffff',
                left: 360,
                top: -397,
                rotate: 25,
                delay: 400
            },
            {
                backgroundColor:'#98c5e9',
                left: 600,
                top: -498,
                rotate: 25,
                delay: 800
            }
        ]
    }

    showStripes = () => (
        this.state.stripes.map((stripe,i)=>(
            <Animate
                key={i}
                show={true}
                start={{
                    backgroundColor:'#ffffff',
                    opacity:0,
                    left:0,
                    rotate:0,
                    top:0
                }}
                enter={{
                    backgroundColor: stripe.backgroundColor,
                    opacity:[1],
                    left: [stripe.left],
                    rotate: [stripe.rotate],
                    top: [stripe.top],
                    timing: {delay:stripe.delay, duration: 300, ease: easePolyOut},
                    events:{ end() {
                           // console.log('animation finished')
                    }}
                }}

            >
                {({ opacity,left,rotate,top,backgroundColor })=>{
                    return(
                        <div className="stripe"
                             style={{
                                backgroundColor,
                                opacity,
                                transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`
                            }}
                        ></div>
                    );
                }}
            </Animate>
        ))
    )

    render() {
        return (
            <div className="featured_stripes">
                {this.showStripes()}
            </div>
        );
    }
}

export default Stripes;