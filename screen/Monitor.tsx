import * as React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function Monitor() {
    return (
      <View style={{height: '100%', width: '100%', flex: 1, alignSelf: 'stretch'}}>
        <WebView source={{ uri: 'http://120.124.28.38:40000/stream' }} />
      </View>
    );
}

export default Monitor;
