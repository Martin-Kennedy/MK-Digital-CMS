
import React, {Fragment} from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const SurfAppToolTipComponent = (props) => {
    return (
                <OverlayTrigger
                    key={props.message}
                    placement={props.placement}
                    overlay={
                        <div style={{
                            borderRadius: '5px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRightColor: 'rgba(255, 255, 255, 0.07)',
                            borderBottomColor: 'rgba(255, 255, 255, 0.07)',
                            boxShadow: '0 20px 30px rgba(0, 0, 0, 0.07)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            letterSpacing: '.1vw',
                            fontSize: '1rem',
                            fontWeight: '400',
                            width: 'fit-content',
                            padding: '1vw 2.5vw',
                            zIndex: '12',
                            backdropFilter: 'blur(2px)',
                            marginRight: '3px',
                        }} id={`tooltip-${props.message}`}>
                            {props.message}
                        </div>
                    }
                >
            {props.children}
                </OverlayTrigger>
    );
}