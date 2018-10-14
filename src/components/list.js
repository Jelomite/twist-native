import React, {Component} from "react";
import {FlatList, Text, View} from "react-native";
import {ListItem} from "react-native-elements";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      style: props.style,
      onPress: props.onPress
    };
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          renderItem={({item}: any) => (
            <ListItem
              containerStyle={this.state.style.containerStyle}
              titleStyle={this.state.style.titleStyle}
              title={item.title}
            />
          )}
        />
      </View>
    );
  }
}

export default List;
