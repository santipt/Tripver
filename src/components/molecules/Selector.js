// Importing react utilities
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// Importing components
import * as Colors from '../../styles/colors';

export default class Selector extends Component {
    constructor() {
        super();
        this.state = {
            selectedItems: [],
        };
    }
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
    };

    render() {
        return (
            <View>
                <SectionedMultiSelect
                    items={this.props.list}
                    IconRenderer={MaterialIcons}
                    single={false}
                    selectedText=""
                    alwaysShowSelectText={true}
                    selectToggleIconComponent={<Icon
                        name='plus'
                        color='black'
                        size={18}
                    />}
                    selectedIconComponent={
                        <MaterialIcons
                            name='check'
                            color='green'
                            size={20}
                        />
                    }
                    uniqueKey="id"
                    selectText={"Select " + this.props.listName}
                    confirmText="Confirm"
                    searchPlaceholderText={"Search " + this.props.listName + "..."}
                    showDropDowns={false}
                    modalWithSafeAreaView={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    onSelectedItemObjectsChange	={this.props.onSelectedItemObjectsChange}
                    selectedItems={this.state.selectedItems}
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
    confirm_button: {
        backgroundColor: Colors.SECONDARY,
    },
    confirm_text: {
        fontSize: 20,
    },
    chipColor: {
        borderColor: Colors.PRIMARY
    },
    chipText: {
        color: Colors.PRIMARY,
    },
    chipIcon: {
        color: Colors.PRIMARY,
    },
    item: {
        marginTop: 5,
        marginBottom: 5
    },
    itemText: {
        fontSize: 20,
        fontWeight: 'normal'
    },
    selectedItemText: {
        fontWeight: 'bold'
    },
    searchBar: {
        marginTop: 5,
        marginBottom: 5,
    },
    searchTextInput: {
        fontSize: 20,
    },
    selectToggle: {
        marginBottom: '2%',
    }
});