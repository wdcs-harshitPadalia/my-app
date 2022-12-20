import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAllContacts} from '../apiHandler/apiActions';

interface contactObj {
	firstName: string;
	lastName?: string;
	profilePath?: string;
}

interface contactType {
	contacts: Array<contactObj>;
	isLoading: boolean;
}

export const initialState: contactType = {
	contacts: [],
	isLoading: false
};

const contactsData = createSlice({
	name: 'contactsData',
	initialState: initialState,
	reducers: {
		clearContacts: (state, action: PayloadAction<any>) => {
			console.log('action.payload.clearContacts', action.payload);
			state.contacts = [];
		}
	},
	extraReducers: builder => {
		// getAllContacts
		builder.addCase(getAllContacts.pending, (state, action) => {
			console.log('getAllContacts.pending :: ');
			state.isLoading = true;
		});
		builder.addCase(getAllContacts.fulfilled, (state, action) => {
			console.log('getAllContacts.fulfilled :: ', action.payload);
			state.isLoading = false;
			state.contacts = action.payload;
		});
		builder.addCase(getAllContacts.rejected, (state, action) => {
			console.log('getAllContacts.rejected :: ', action.payload);
			state.isLoading = false;
		});
	}
});

export const {clearContacts} = contactsData.actions;

export default contactsData;
