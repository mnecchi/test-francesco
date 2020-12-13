import React, { FC, useEffect, useReducer, useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import fetchQuestions from './data/fetchQuestions';
import { Questions } from './data/types';
import reducer from './data/reducer';

const Home: FC = () => {
  const [questions, setQuestions] = useState<Questions>();
  const [userAnswers, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetchQuestions();
      setQuestions(response);
    };
    getQuestions();
  }, [setQuestions]);

  const now = new Date(Date.now()).toTimeString();

  return (
    <ScrollView>
      <Text>Render {now}</Text>
      {questions &&
        questions.map((question) => {
          const { id, text, answers } = question;
          return (
            <View testID={id} key={id} style={styles.question}>
              <Text>Render {now}</Text>
              <Text style={styles.questionTitle}>{text}</Text>
              {answers.map((answer) => {
                const { id: answerId, text: answerText } = answer;
                return (
                  <TouchableWithoutFeedback
                    testID={answerId}
                    key={answerId}
                    onPress={() => {
                      dispatch({
                        type: 'setUserAnswer',
                        payload: { id, answerId },
                      });
                    }}>
                    <Text
                      style={userAnswers[id] === answerId && styles.selected}>
                      {answerText} {Date.now()}
                    </Text>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          );
        })}
      <View style={styles.buttonContainer}>
        <Text>Render {now}</Text>
        <Button
          testID="submit"
          disabled={
            !questions || Object.keys(userAnswers).length !== questions.length
          }
          onPress={() => {
            Alert.alert('Submit!');
          }}
          title="Submit"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  question: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 12,
    marginTop: 12,
  },
  questionTitle: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  selected: {
    fontWeight: 'bold',
    color: 'green',
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    borderColor: 'lightblue',
    borderWidth: 1,
  },
});

export default Home;
