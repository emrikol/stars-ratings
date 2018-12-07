<?php
/**
 * Plugin Name: Stars Rating
 * Plugin URI: https://github.com/emrikol/stars-rating/
 * Description: Provides a "Stars" rating system block for Gutenberg.
 * Author: emrikol
 * Author URI: https://emrikol.com/
 * Version: 1.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package WordPress
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
