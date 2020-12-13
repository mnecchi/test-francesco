import { UserAnswers } from './types';

type Action = {
  type: 'setUserAnswer';
  payload: {
    id: string;
    answerId: string;
  };
};

const reducer = (state: UserAnswers, action: Action) => {
  switch (action.type) {
    case 'setUserAnswer':
      const { id, answerId } = action?.payload;
      const newState = { ...state };
      if (newState[id] === answerId) {
        delete newState[id];
      } else {
        newState[id] = answerId;
      }
      return newState;
  }
};

export default reducer;
