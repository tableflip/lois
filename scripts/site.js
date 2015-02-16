(function () {
  'use strict';

  var DEBUG = false;

  if (!window.document.querySelector) {
    return false;
  }

  /**
   * This method fixes a browser bug in iOS8 Mobile Safari. When the
   * user opens a select menu, it triggers a change event. And in this
   * template a change event redirects the user to a new page.
   *
   * @method mobileNavRedirectFix
   * @private
   */
  function mobileNavRedirectFix () {
    var mobileSelect = document.getElementById('mobileSelect');
    var preventRedirect = true;

    if (!mobileSelect) {
      if (DEBUG === true) {
        console.log('Cannot find the mobile select element.');
      }

      return false;
    }

    mobileSelect.addEventListener('focus', function (e) {
      if (preventRedirect === true) {
        preventRedirect = false;

        for (var index = 0; index < mobileSelect.options.length; index++) {
          mobileSelect.options[index].selected = false;
        }

        mobileSelect.blur();
        mobileSelect.focus();
      }

      setTimeout(function () {
        preventRedirect = true;
      }, 200);
    });

    mobileSelect.addEventListener('change', function (e) {
      if (preventRedirect === true) {
        var destination;

        for (var index = 0; index < mobileSelect.options.length; index++) {
          if (mobileSelect.options[index].selected === true) {
            destination = mobileSelect.options[index].value;
          }
        }

        window.location = destination;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', mobileNavRedirectFix);
}());
