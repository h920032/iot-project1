import * as React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function Monitor() {
    return (
      <View style={{height: '100%', width: '100%', flex: 1, alignSelf: 'stretch'}}>
        <WebView source={{ uri: 'https://youtu.be/Ltg_TERQPsY' }} />
      </View>
    );
}

export default Monitor;
