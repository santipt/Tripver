// Importing react utilities
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// Importing components
import * as Colors from '../../styles/colors';

export default class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            maxItems: 12,
        };
    }
    onSelectedItemsChange = (selectedItems) => {
        if (selectedItems.length > this.state.maxItems) {
            return;
        }
        this.setState({ confirmText: `${selectedItems.length}/${this.state.maxItems}` })

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
                    onSelectedItemObjectsChange={this.props.onSelectedItemObjectsChange}
                    selectedItems={this.state.selectedItems}
                    styles={{
                        button: styles.confirm_button, confirmText: styles.confirm_text,
                        chipText: styles.chipText, chipContainer: styles.chipColor, chipIcon: styles.chipIcon, item: styles.item, itemText: styles.itemText,
                        selectedItemText: styles.selectedItemText, searchBar: styles.searchBar, searchTextInput: styles.searchTextInput, selectToggle: styles.selectToggle,
                        selectToggleText: styles.selectToggleText
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
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.WHITE
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
        fontWeight: 'bold',
        fontSize:20,
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
    },
    selectToggleText:{
        fontSize:15,
    },
});