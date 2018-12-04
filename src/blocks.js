/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

/**
 * Gutenberg Blocks
 */
import * as stars from './stars/stars.js';
import * as stars_total from './stars/stars_total.js';

/**
 * Internal dependencies
 */
const { registerBlockType } = wp.blocks;
const {
	select,
	dispatch,
	subscribe,
} = wp.data;

/**
 * Register blocks
 */
[
	stars,
	stars_total,
].forEach( ( { name, settings } ) => {
	registerBlockType( name, settings );
} );

const getBlockList = () => select( 'core/editor' ).getBlocks();
let blockList = getBlockList();

let the_stars_said_nothing = () => { return };

const what_did_the_stars_say = () => {
	const newBlockList = getBlockList();
	const blockListChanged = newBlockList !== blockList;
	blockList = newBlockList;

	let total_ratings = 0;
	let total_stars = 0;
	newBlockList.forEach( function ( block ) {

		if ( blockListChanged ) {
			if ( 'emrikol/stars-rating' === block.name ) {
				total_ratings = total_ratings + block.attributes.rating;
				total_stars = total_stars + block.attributes.star_count;
			}
		}

		if ( 'emrikol/stars-rating-total' === block.name ) {
			let total_star_count = select( 'stars-totals' ).getValue( 'stars' );
			let total_rating = select( 'stars-totals' ).getValue( 'ratings' );
			let new_rating = Math.round( ( block.attributes.star_count * ( total_rating / total_star_count ) ) * 2 ) / 2; // Round to the nearest half.
			the_stars_said_nothing(); // Unsub to prevent infinite loop. I hope I'm doing this right.
			wp.data.dispatch( 'core/editor' ).updateBlockAttributes( block.clientId, { rating: new_rating } );
			the_stars_said_nothing = subscribe( what_did_the_stars_say ); // Resub.
		}
	} );

	if ( blockListChanged ) {
		dispatch( 'stars-totals' ).setValue( 'ratings', total_ratings );
		dispatch( 'stars-totals' ).setValue( 'stars', total_stars );
	}
}

the_stars_said_nothing = subscribe( what_did_the_stars_say );