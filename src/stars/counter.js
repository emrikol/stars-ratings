// Docs: https://wordpress.org/gutenberg/handbook/packages/packages-data/
const {
	data,
	apiFetch
} = wp;
const { registerStore } = data;

const DEFAULT_STATE = {
	values: {
		'stars': 0,
		'ratings': 0,
	},
};

const actions = {
	setValue( item, value ) {
		return {
			type: 'SET_VALUE',
			item,
			value,
		};
	},
};

registerStore( 'stars-totals', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_VALUE':
				return {
					...state,
					values: {
						...state.values,
						[ action.item ]: action.value,
					},
				};
		}

		return state;
	},

	actions,

	selectors: {
		getValue( state, item ) {
			const { values } = state;
			const value = values[ item ];

			return value;
		},
	},

} );
