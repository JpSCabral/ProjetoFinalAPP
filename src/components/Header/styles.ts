import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 88,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 38,
        paddingBottom: 12,
    },
    topRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
        
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: { fontSize: 18, color: '#E85D5D', fontWeight: 'bold' },
    avatar: { width: 40, height: 40, borderRadius: 20}
}); 