//  Import CSS.
import './style.scss';
import './editor.scss';

// External Dependencies.
import classNames from 'classnames';

// Internal Dependencies.
const { __ } = wp.i18n;
const {
	Component,
	Fragment
} = wp.element;
const {
	PanelBody,
	RangeControl,
} = wp.components;
const {
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} = wp.editor;
const {
	select,
	dispatch
} = wp.data;

//Import our mini-store for counter
import total_star_counter from './counter';
import total_review_counter from './counter';

class StarsRating extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			isSelected,
			toggleSelection,
		} = this.props;

		const {
			rating,
			star_count,
			alignment,
		} = attributes;

		const onChangeAlignment = ( updatedAlignment ) => {
			setAttributes( { alignment: updatedAlignment } );
		}

		const update_rating = function( value ) {
			// Click again to reset, and make sure we never go negative.
			if ( value === rating || value < 0 ) {
				value = 0;
			}
			setAttributes( { rating: value } );
		}

		const update_star_count = function( value ) {
			// Make sure we never go negative, or above the star count.
			if ( value < 1 ) {
				value = 1;
			} else if ( value < rating ) {
				setAttributes( { rating: value } );
			}
			setAttributes( { star_count: value } );
		}

		const generate_stars_edit = () => {
			const stars = [];
			const rating_id = _.uniqueId( 'rating-' );
			for ( var i = ( star_count * 2 ); i >= 1; i-- ) {
				const id = _.uniqueId( 'stars-' );
				stars.push(
					<Fragment>
						<input type="radio" checked={ rating === i/2 } onClick={ update_rating.bind( null, i/2 ) } id={id} name={rating_id} value={i/2} /><label title={i/2} class={ i % 2 == 0 ? 'full' : 'half' } for={id}></label>
					</Fragment>
				);
			}

			return stars;
		}

		const generate_stars_view = () => {
			const stars = []
			for ( var i=1; i <= ( star_count * 2 ); i++ ) {
				stars.push( <span className={ classNames( {
					'full': i % 2 == 0,
					'half': i % 2 != 0,
					'active': i / 2 <= rating,
				} ) } title={i/2}></span> )
			}

			return stars;
		}

		if ( ! isSelected ) {

			return (
				<Fragment>
					<div class='stars-rating' style={ {textAlign:  alignment } }>
						{ generate_stars_view() }
					</div>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={ __( 'Star Count' ) }
							value={ star_count }
							onChange={ ( value ) => update_star_count( value ) }
							min={ 1 }
							max={ 10 }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
				<div class='stars-rating' style={ {textAlign:  alignment } }>
					<p class='editor-hint'>(Stars Rating: { rating })</p>
					<fieldset class="rating">
						{ generate_stars_edit() }
					</fieldset>
				</div>
			</Fragment>
		);
	}
}

export const name = 'emrikol/stars-rating';

export const settings = {
	title: __( 'Stars Rating' ),
	description: __( 'Star Ratings in half-star increments' ),
	icon: 'star-filled',
	category: 'common',
	keywords: [
		__( 'Stars' ),
		__( 'Rating' ),
	],
	attributes: {
		alignment: {
			type: 'string',
		},
		rating: {
			type: 'number',
			default: 0,
		},
		star_count: {
			type: 'number',
			default: 5,
		},
	},

	edit: StarsRating,

	save: StarsRating,
}
