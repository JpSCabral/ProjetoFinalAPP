import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4efea",
    alignItems: "center",
    justifyContent: "center",
  },
  
centeredView: {
  flex: 1, // Ocupa a tela toda
  justifyContent: 'center', // Centraliza na vertical
  alignItems: 'center', // Centraliza na horizontal
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente escuro
}, mealHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 10,
  paddingHorizontal: 20,
  width: '100%',
},
  modalView: {
    width: '85%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  modalButton: {
    backgroundColor: '#3B82F6', // Azul
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  closeButton: {
    marginTop: 12,
    padding: 8,
  },
  closeButtonText: {
    color: '#777'
  }, foodItemInModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    width: '100%', // Ocupa a largura do modal
  },
  foodNameModal: {
    fontSize: 16,
    color: '#333',
  },
  foodUnitModal: {
    fontSize: 12,
    color: '#777',
  },
  foodCaloriesModal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4C763B', // Verde do seu app
  },
  emptyModalText: {
    fontSize: 14,
    color: '#777',
    marginVertical: 24,
    textAlign: 'center',
  },

});
