<?php

/**
 * @file
 * Custom theme setting form elements for the USWDS Base theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function iq_uswds_form_system_theme_settings_alter(&$form, FormStateInterface &$form_state, $form_id = NULL) {


  // Menu behavior.
  $saved_bypass = theme_get_setting('uswds_menu_bypass');
  if (empty($saved_bypass)) {
    $saved_bypass = [];
  }

  $form['iq_uswds_fieldset'] = [
    '#type' => 'details',
    '#title' => t('IQ USWDS Configuration'),
    '#open' => TRUE,
    'iq_uswds_gtm_id' => [
      '#type' => 'textfield',
      '#title' => t('Adds the GTM ID'),
      '#default_value' => theme_get_setting('iq_uswds_gtm_id'),
    ],
    'iq_uswds_invicti_key' => [
      '#type' => 'textfield',
      '#title' => t('Adds the Invicti/Netsparker Verification Key'),
      '#default_value' => theme_get_setting('iq_uswds_invicti_key'),
    ],
  ];
}
