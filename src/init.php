<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package WordPress
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function stars_ratings_block_assets() {
	// Styles.
	wp_enqueue_style(
		'stars-ratings-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( ) // Dependency to include the CSS after it.
	);
} // End function stars_ratings_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'stars_ratings_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function stars_ratings_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'stars-ratings-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'stars-ratings-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
	);
} // End function stars_ratings_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'stars_ratings_editor_assets' );
