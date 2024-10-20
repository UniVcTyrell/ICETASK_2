// App.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'Home' | 'Game' | 'Result'>('Home');
  const [equation, setEquation] = useState<string>('');
  const [answer, setAnswer] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(20);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Generate a random math equation
  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 50);
    const num2 = Math.floor(Math.random() * 50);
    const op = Math.random() < 0.5 ? '+' : '-';
    setEquation(`${num1} ${op} ${num2}`);
    setAnswer(eval(`${num1}${op}${num2}`)); // Evaluate the answer
  };

  useEffect(() => {
    if (currentScreen === 'Game') {
      generateEquation();
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsGameOver(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentScreen]);

  const handleStartGame = () => {
    setCurrentScreen('Game');
    setScore(0); // Reset score for a new game
    setIsGameOver(false);
  };

  const handleAnswerSubmit = () => {
    if (parseInt(userInput) === answer) {
      setScore((prev) => prev + 10); // Increase score for correct answer
      generateEquation();
      setTimeRemaining(20); // Reset time
      setUserInput(''); // Clear input
    } else {
      setIsGameOver(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentScreen('Game');
    setIsGameOver(false);
    setUserInput(''); // Clear input
  };

  const handleBackToHome = () => {
    setCurrentScreen('Home');
    setUserInput(''); // Clear input
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'Home' && (
        <View style={styles.screen}>
          <Text style={styles.title}>Welcome to Arithmetica Game!</Text>
          <Text style={styles.description}>
            Help Arithmetica master her magical arithmetic skills!
          </Text>
          <Button title="Start Training" onPress={handleStartGame} color="#FFD700" />
        </View>
      )}

      {currentScreen === 'Game' && (
        <View style={styles.screen}>
          {isGameOver ? (
            <>
              <Text style={styles.gameOverText}>Game Over!</Text>
              <Text style={styles.title}>Your Score: {score}</Text>
              <Button title="Try Again" onPress={handleTryAgain} color="#FFD700" />
              <Button title="Back to Home" onPress={handleBackToHome} color="#FFD700" />
            </>
          ) : (
            <>
              <Text style={styles.equation}>{equation}</Text>
              <Text style={styles.timer}>Time Remaining: {timeRemaining}s</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your answer"
                keyboardType="numeric"
                value={userInput}
                onChangeText={setUserInput}
              />
              <Button title="Submit Answer" onPress={handleAnswerSubmit} color="#FFD700" />
            </>
          )}
        </View>
      )}

      {currentScreen === 'Result' && (
        <View style={styles.screen}>
          <Text style={styles.title}>Your Score: {score}</Text>
          <Button title="Continue Training" onPress={handleStartGame} color="#FFD700" />
          <Button title="Back to Home" onPress={handleBackToHome} color="#FFD700" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Black background
  },
  screen: {
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFD700', // Gold color
    marginBottom: 40,
  },
  equation: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
    marginBottom: 20,
  },
  timer: {
    fontSize: 20,
    color: '#FFD700', // Gold color
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#FFD700', // Gold border
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
    color: '#FFD700', // Gold text color
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
});

export default App;
