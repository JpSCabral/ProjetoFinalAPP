import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#f0f0f0",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 8,
        padding: 16,
        margin: 16,
        width: "90%",
        alignItems: "center",
    },
    divisoria:{
        width: 1,
        height: "100%",
        backgroundColor: "#000",
    },
    textArea:{
        alignItems: "center",
    }, 
    numberText:{
        fontSize: 32,
        fontWeight: "bold",
    },
})