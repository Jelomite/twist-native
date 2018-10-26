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
              containerStyle={this.props.style.listContainer}
              titleStyle={this.props.style.listTitle}
              subtitleStyle={this.props.style.listSubtitle}
              titleStyle={this.props.style.listTitle}
              title={"Episode " + (item.number + 1)}
              onPress={() => this.props.onPress(item)}
            />
          )}
        />
      </View>
    );
  }
}

export default List;
