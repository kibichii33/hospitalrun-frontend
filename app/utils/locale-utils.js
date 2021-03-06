import Ember from 'ember';

/**
 * Utilities for working with ember-i18n locales
 *
 * Pulled from ember-i18n internals, which do not expose these functions directly
 */

/**
 * Walk up configuration objects from most specific to least.
 */
function walkConfigs(id, owner) {
  let appConfig = owner._lookupFactory(`locale:${id}/config`);
  if (appConfig) {
    return appConfig;
  }

  let addonConfig = owner._lookupFactory(`ember-i18n@config:${id}`);
  if (addonConfig) {
    return addonConfig;
  }

  let parentId = parentLocale(id);
  if (parentId) {
    return walkConfigs(parentId, owner);
  }
}

function parentLocale(id) {
  let lastDash = id.lastIndexOf('-');
  return lastDash > 0 ? id.substr(0, lastDash) : null;
}

/**
 * Set RTL settings on current application
 * @param {boolean} active Is RTL active in current locale or not (default: false)
 */
function setRTL(active) {
  if (active) {
    Ember.$('body').addClass('rtl');
  } else {
    Ember.$('body').removeClass('rtl');
  }
}

export { walkConfigs, setRTL };