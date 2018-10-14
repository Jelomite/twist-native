import React, {Component} from "react";
import {FlatList, Text, View} from "react-native";
import {ListItem} from "react-native-elements";

class List extends Component {
  render() {
    return (
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.props.data}
          renderItem={({item}: any) => (
            <ListItem
              containerStyle={this.props.style.containerStyle}
              titleStyle={this.props.style.titleStyle}
              title={item.title}
            />
          )}
        />
      </View>
    );
  }
}

export default List;
