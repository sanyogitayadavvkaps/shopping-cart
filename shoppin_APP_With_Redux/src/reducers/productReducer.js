
const initialState = {
    currentPage: 1,
    totalPage: 0,
    productData: [],
    categoryData:[],
    allGetCart:[]
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            console.log(" ...state totalPage: action. b,=>",{  ...state,
                currentPage: action.payload,},)
            return {
                ...state,
                currentPage: action.payload,
            };
        case 'SET_TOTAL_PAGE':
            console.log(" ...state totalPage: action.payload,=>",{ ...state,
            totalPage: action.payload},)
            return {
                ...state,
                totalPage: action.payload,
            };
        case 'SET_PRODUCT_DATA':
            return {
                ...state,
                productData: action.payload,
            };
            case 'SET_CATEGORY_DATA':
                return {
                  ...state,
                  categoryData: action.payload,
                };
                case 'SET_ALL_GET_CART':
                    return {
                      ...state,
                      allGetCart: action.payload,
                    };
        default:
            return state;
    }
};

export default productReducer;