import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect, Component } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import languages from '../../utils/languages'

const animatedComponents = makeAnimated();


export default function SelectLanguages() {

    /*const [selectedOptions, setSelectedOptions] = useState([]);
  
    const handleChange = (languages) => {
      console.log("----------------------------");
      setSelectedOptions(languages);
    };*/
    return (


            <Select
                //onChange={handleChange}
                styles={customStyles}
                closeMenuOnSelect={false}
                blurInputOnSelect={false}
                //components={animatedComponents}
                defaultValue={[languages[4], languages[5], languages[8], languages[15], languages[1], languages[9]]}
                isMulti={true}
                options={languages}
                isSearchable={true}
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: 'orange',
                        primary: 'orange',
                    },

                })}
            // FIRST SCREEN
            //isClearable={false} // Para quitar la x
            //isDisabled={true} // Para inhabilitarlo

            />

    );
}

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        //borderBottom: '1px dotted pink',
        color: 'red',
    }),

    indicatorsContainer: (_, { selectProps: { } }) => ({
        height: 5,
        // FIRST SCREEN
        //display: 'none' // Para quitar el icono de dropdawon
    }),

    option: (provided, state) => ({
        ...provided,
        color: 'black',
        padding: 15,
    }),

    // FIRST SCREEN
    // change color of the value when is selected
    /*multiValue: (provided, state) => ({
      ...provided,
        backgroundColor: 'white',
      }),*/

    // FIRST SCREEN
    // change color of the cross's value when is selected
    /*multiValueRemove: (provided, state) => ({
      ...provided,
        ':hover': {
          backgroundColor: 'black',
          color: 'black',
        },
      }),*/

    // Delete x from item
    multiValueRemove: (base) => ({ ...base, /* FIRST SCREEN /*display: 'none'*/ color: 'red', }),

}

