import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    news: []
};

const newSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNews: (state, action) => {
            const { news } = action.payload;
            state.news = news;
        }
    }
});

export const newActions = newSlice.actions;
export default newSlice.reducer;
