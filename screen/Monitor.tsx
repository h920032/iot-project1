import * as React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function Monitor() {
    return (
      <View style={{height: '100%', width: '100%', flex: 1, alignSelf: 'stretch'}}>
        <WebView source={{ uri: 'https://www.youtube.com/watch?v=aYe-2Glruu4' }} />
      </View>
    );
}

export default Monitor;