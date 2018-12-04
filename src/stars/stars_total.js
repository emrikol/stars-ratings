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

class StarsRating extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			isSelected,
			toggleSelection,
		} = this.props;

		const {
			star_count,
			alignment,
			rating,
		} = attributes;

		const onChangeAlignment = ( updatedAlignment ) => {
			setAttributes( { alignment: updatedAlignment } );
		}

		const update_star_count = function( value ) {
			setAttributes( { star_count: value } );
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
					<div class='stars-rating' style={ {textAlign: alignment } }>
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
					<div class='stars-rating' style={ {textAlign: alignment } }>
						<p class='editor-hint'>(Stars Rating Total: { rating })</p>
						{ generate_stars_view() }
					</div>
			</Fragment>
		);
	}
}

export const name = 'emrikol/stars-rating-total';

export const settings = {
	title: __( 'Stars Rating Total' ),
	description: __( 'The total of all Star Ratings' ),
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
		star_count: {
			type: 'number',
			default: 5,
		},
		rating: {
			type: 'number',
			default: 0,
		},
	},

	edit: StarsRating,

	save: StarsRating,
}
