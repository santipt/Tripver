// Importing react utilities
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// Importing components
import * as Colors from '../../styles/colors';

export default class SelectedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
        };
    }
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    };

    componentDidMount() {
        if (this.props.selectedItems != undefined) {
            var newList = [];
            this.props.selectedItems.forEach(item => {
                newList.push(item.id)
            });
            this.setState({selectedItems : newList})
        }
    }

    render() {
        return (
            <View>
                <SectionedMultiSelect
                    hideSelect={true}
                    items={this.props.list}
                    IconRenderer={MaterialIcons}
                    uniqueKey="id"
                    modalWithSafeAreaView={true}
                    selectedItems={this.state.selectedItems}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    onSelectedItemObjectsChange={this.props.onSelectedItemObjectsChange}
                    styles={{
                        button: styles.confirm_button, confirmText: styles.confirm_text,
                        chipText: styles.chipText, chipContainer: styles.chipColor, chipIcon: styles.chipIcon, item: styles.item, itemText: styles.itemText,
                        selectedItemText: styles.selectedItemText, searchBar: styles.searchBar, searchTextInput: styles.searchTextInput, selectToggle: styles.selectToggle
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chipColor: {
        borderColor: Colors.PRIMARY
    },
    chipText: {
        color: Colors.PRIMARY,
        marginRight: 10,
    },
    chipIcon: {
        display: 'none',
    },
});