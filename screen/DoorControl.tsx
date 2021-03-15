import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function DoorControl() {
    const [doorOne, setDoorOne] = useState(true);
    const [doorTwo, setDoorTwo] = useState(true);
    const control = (door) => {
        fetch('http://120.124.28.38:30000/door',
            {
                method: 'POST',
                body: JSON.stringify({to_toggle: door}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'},
            },
            )
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.is_on);
                setDoorOne(data.is_on[0]);
                setDoorTwo(data.is_on[1]);
                // console.log(data.access);
        });
    }

    return (
    <View style={styles.container}>
        <TouchableOpacity
        style={[styles.button, doorOne?{backgroundColor: '#b8f2e699'}:{backgroundColor: '#ffa69e99'}]}
        onPress={()=>{control(1)}}
        >
            <Text style={styles.buttonText}>Front Door</Text>
            <Text style={styles.buttonText}>{doorOne?'Close':'Open'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[styles.button, doorTwo?{backgroundColor: '#b8f2e699'}:{backgroundColor: '#ffa69e99'}]}
        onPress={()=>{control(2)}}
        >
            <Text style={styles.buttonText}>MailBox Door</Text>
            <Text style={styles.buttonText}>{doorTwo?'Close':'Open'}</Text>
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    button: {
        height: '40%',
        marginVertical: '2%',
        alignItems: "center",
        padding: '5%',
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    },
    buttonText: {
        fontSize: 30,
    }
});

export default DoorControl;