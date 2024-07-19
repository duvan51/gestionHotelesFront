import React,{ createContext, useReducer, useEffect } from 'react'


const CartContext = createContext();



// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        if (state.find(item => item.id === action.payload.id)) {
            console.log("state", state)
            return state;
          }
        return [...state, action.payload];
      case 'REMOVE_ITEM':
        return state.filter(item => item.id !== action.payload.id);
      default:
        return state;
    }
};


// Proveedor del contexto
const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
      });
      useEffect(() => {
       
        localStorage.setItem('cart', JSON.stringify(cart));
        //console.log("cart =>", cart)
      }, [cart]);

   
  
    return (
      <CartContext.Provider value={{ cart, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };


  export { CartContext, CartProvider };