import { StyleSheet, View, Dimensions } from "react-native";

import Colors from "../../constants/colors";

function Card({ children }) {
    return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth < 500 ? 18: 36,
        marginHorizontal: 24,
        padding: 20,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, //android only concept
        shadownColor: 'black',//to get iphone shadow
        shadowOffset: { width: 0, height: 2 },//to get iphone shadow
        shadowRadius: 6,//to get iphone shadow
        shadowOpacity: 0.25, //to get iphone shadow
    },
});