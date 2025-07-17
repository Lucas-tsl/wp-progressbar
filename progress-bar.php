<?php

/**
 * Plugin Name: LSG Progressive Bar
 * Author: Lucas Troteseil
 * Description:  Progressive bar personalis� � int�grer dans le mini panier
 * Version: 1.0.0
 */
function render_custom_freeshiping($attributes = [], $content = '') {
    ob_start();
    ?>
    <div class="pb-cont">
        <p id="text-indicator">
            Plus que <span class="progress-bar-text">0.00</span> avant une r�duction.
        </p>
        <div class="pb">
            <div class="progress-bar-wrapper">
                <div class="progress-bar">
                    <div class="progress-bar-fill"></div>
                </div>
            </div>
            <div class="progress-bar-marker" style="left: 66.67%;"></div>
            <div class="progress-bar-marker-txt">
                <?= __('Livraison offerte', 'lsg_toolbox'); ?>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

function lsg_enqueue_assets() {
    // Enqueue JavaScript
    wp_enqueue_script(
        'lsg-progress-bar-js',
        plugin_dir_url(__FILE__) . 'assets/js/progress-bar.js',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'assets/js/progress-bar.js'),
        true
    );

    wp_enqueue_script(
        'lsg-block-registration-js',
        plugin_dir_url(__FILE__) . 'assets/js/block-registration.js',
        array('wp-blocks', 'wp-element', 'wp-data'),
        filemtime(plugin_dir_path(__FILE__) . 'assets/js/block-registration.js'),
        true
    );

    // Enqueue CSS
    wp_enqueue_style(
        'lsg-progress-bar-css',
        plugin_dir_url(__FILE__) . 'assets/css/style.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'assets/css/style.css')
    );
}
add_action('wp_enqueue_scripts', 'lsg_enqueue_assets');

function register_custom_freeshiping()
{
    register_block_type('custom/freeshiping', array(
        'render_callback' => 'render_custom_freeshiping'
    ));
}
add_action('init', 'register_custom_freeshiping');

// Enqueue block assets
function custom_block_assets()
{
    $file_path = plugin_dir_path(__FILE__) . 'block.js';

    if (file_exists($file_path)) {
        wp_enqueue_script(
            'custom-block-js',
            plugin_dir_url(__FILE__) . 'block.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-data'),
            filemtime($file_path),
            true
        );
    } else {
        error_log('File block.js not found: ' . $file_path);
    }
}
add_action('enqueue_block_editor_assets', 'custom_block_assets');

