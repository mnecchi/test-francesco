import React from 'react';
import {
  act,
  create,
  ReactTestInstance,
  ReactTestRenderer,
} from 'react-test-renderer';
import { Alert } from 'react-native';
import Home from '../Home';
import mockQuestions from '../data/questions.json';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest
  .spyOn(global.Date, 'now')
  .mockImplementation(() => new Date('01/12/2020 12:00:00').getTime());

jest.mock('../data/fetchQuestions', () => ({
  __esModule: true,
  default: () => Promise.resolve(mockQuestions),
}));

describe('Home component', () => {
  it('should fetch and display the questions', async () => {
    let wrapper: ReactTestRenderer;

    await act(async () => {
      wrapper = create(<Home />);
    });

    expect(wrapper!.root.findByProps({ testID: 'q01' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q01a01' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q01a02' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q01a03' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q02' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q02a01' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q02a02' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q03' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q03a01' })).not.toBeUndefined();
    expect(wrapper!.root.findByProps({ testID: 'q03a02' })).not.toBeUndefined();

    expect(wrapper!).toMatchSnapshot();
  });

  it('should select and deselect an answer on click', async () => {
    let wrapper: ReactTestRenderer;

    await act(async () => {
      wrapper = create(<Home />);
    });

    const answer = wrapper!.root.findByProps({ testID: 'q01a02' });
    await act(async () => {
      answer.props.onPress();
    });
    expect(
      (answer.children[0] as ReactTestInstance).props.style.fontWeight,
    ).toBe('bold');

    await act(async () => {
      answer.props.onPress();
    });
    expect(
      (answer.children[0] as ReactTestInstance).props.style.fontWeight,
    ).toBeUndefined();
  });

  it('should enable the submit button only if all questions are answered', async () => {
    let wrapper: ReactTestRenderer;

    await act(async () => {
      wrapper = create(<Home />);
    });

    const submit = wrapper!.root.findByProps({ testID: 'submit' });
    expect(submit.props.disabled).toBe(true);

    await act(async () => {
      wrapper!.root.findByProps({ testID: 'q01a02' }).props.onPress();
    });
    await act(async () => {
      wrapper!.root.findByProps({ testID: 'q02a01' }).props.onPress();
    });
    await act(async () => {
      wrapper!.root.findByProps({ testID: 'q03a02' }).props.onPress();
    });
    expect(submit.props.disabled).toBe(false);
  });

  it('should display an alert when submit is pressed', async () => {
    jest.spyOn(Alert, 'alert');
    let wrapper: ReactTestRenderer;

    await act(async () => {
      wrapper = create(<Home />);
    });
    await act(async () => {
      wrapper!.root.findByProps({ testID: 'q01a02' }).props.onPress();
    });
    await act(async () => {
      wrapper!.root.findByProps({ testID: 'q02a01' }).props.onPress();
    });
    await act(async () => {
      wrapper!.root.findByProps({ testID: 'q03a02' }).props.onPress();
    });

    wrapper!.root.findByProps({ testID: 'submit' }).props.onPress();
    expect(Alert.alert).toHaveBeenCalledTimes(1);
  });
});
