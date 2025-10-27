import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({   
    container: {
        flex: 1,
        padding: 8,
    },
    button: {
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,   
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    description: {
        fontSize: 14,
        color: '#333638',
        fontFamily: 'Regular',
    },
    title: {
        fontSize: 16,
        color: '#333638',
        fontFamily: 'Bold',
    },
});