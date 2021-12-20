import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { LineAnimationL2R, LineAnimationR2L } from "./hero/lineSvg";
import TextTranslation from "./hero/textTranslation";
import faker from 'faker';
import { Carousel } from 'react-responsive-carousel';

const createHeroCarouselItemImage = (index, options = {}) => (
    <div key={index}>
        <LineAnimationL2R />
        <TextTranslation text="Long long text to scroll" />
        <img src={`/assets/${index}.jpeg`} />
        <p className="legend">Legend {index}</p>
        <LineAnimationR2L />
    </div>
);

const baseHeroChildren = <div>{[1, 2, 3, 4, 5].map(createHeroCarouselItemImage)}</div>;

const tooglesGroupId = 'Toggles';
const valuesGroupId = 'Values';
const mainGroupId = 'Main';

const getConfigurableProps = () => ({
    showArrows: boolean('showArrows', true, tooglesGroupId),
    showStatus: boolean('showStatus', true, tooglesGroupId),
    showIndicators: boolean('showIndicators', true, tooglesGroupId),
    infiniteLoop: boolean('infiniteLoop', true, tooglesGroupId),
    showThumbs: boolean('showThumbs', true, tooglesGroupId),
    useKeyboardArrows: boolean('useKeyboardArrows', true, tooglesGroupId),
    autoPlay: boolean('autoPlay', true, tooglesGroupId),
    stopOnHover: boolean('stopOnHover', true, tooglesGroupId),
    swipeable: boolean('swipeable', true, tooglesGroupId),
    dynamicHeight: boolean('dynamicHeight', true, tooglesGroupId),
    emulateTouch: boolean('emulateTouch', true, tooglesGroupId),
    autoFocus: boolean('autoFocus', false, tooglesGroupId),
    thumbWidth: number('thumbWidth', 100, {}, valuesGroupId),
    selectedItem: number('selectedItem', 0, {}, valuesGroupId),
    interval: number('interval', 2000, {}, valuesGroupId),
    transitionTime: number('transitionTime', 500, {}, valuesGroupId),
    swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
    ariaLabel: text('ariaLabel', undefined),
});

export default {
    title: '01 - Basic',
    decorators: [withKnobs],
    component: Carousel,
}


const homepageHeroCarousel = () => (
    <Carousel axis="vertical" autoFocus={true} showThumbs={false} showStatus={false} useKeyboardArrows {...getConfigurableProps()}>
        {baseHeroChildren.props.children}
    </Carousel>
);