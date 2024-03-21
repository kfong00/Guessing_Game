import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, useWindowDimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) { // direction => 'lower', 'greater'

        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("WE HAVE A LIAR HERE", 'Honor your family and tell the truth', [
                { text: 'I will honor my family!', style: 'cancel' },
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        console.log(minBoundary, maxBoundary);
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(previousGuessRounds => [newRndNumber, ...previousGuessRounds]);

    }

    const guessRoundsListLength = guessRounds.length;

    let content = (<>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher Or Lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color={'white'} /></PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color={'white'} /></PrimaryButton>
                </View>
            </View>
        </Card>
    </>
    );

    if (width > 500) {
        content = (
            <>
                {/* <InstructionText style={styles.instructionText}>Higher Or Lower?</InstructionText> */}
                <View style = {styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color={'white'} /></PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24} color={'white'} /></PrimaryButton>
                    </View>
                </View>
            </>
        );
    }



    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)} */}
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 40,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',

    },
    buttonContainer: {
        flex: 1
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        padding: 16,

    }

});