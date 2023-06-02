export const setCategoryData = (data) => {
    return {
      type: 'SET_CATEGORY_DATA',
      payload: data,
    };
  };
  export const setAllGetCart = (data)=>{
      return{
          type:'SET_ALL_GET_CART',
          payload:data
      }
  }
export const setCurrentData =  (pageNumber) =>{
  return{
    type:'SET_CURRENT_PAGE',
    payload:pageNumber    
  }
} 