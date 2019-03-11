import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Builder } from './Builder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<Builder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Builder onInitIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ingredients: {
                salad: 0,
            },
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});