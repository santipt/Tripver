import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import * as Colors from '../../styles/colors';
import hobbies from '../../utils/hobbies'

export default class SelectHobbies extends Component {
    constructor() {
        super();
        this.state = {
            selectedItems: [],
        };
    }
    onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
        console.log(selectedItems)
    };

    render() {
        return (
            <View>
                <SectionedMultiSelect
                    items={hobbies}
                    IconRenderer={Icon}
                    single={false}
                    selectedText=""
                    alwaysShowSelectText={true}
                    uniqueKey="id"
                    selectText="Select hobbies"
                    confirmText="Confirm"
                    searchPlaceholderText="Search hobbies..."
                    showDropDowns={false}
                    modalWithSafeAreaView={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
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
    selectToggle:{
        marginBottom:'2%',
    }
});