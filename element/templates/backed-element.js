'use strict';
/**
 * A trying to be useful element!
 * @extends HTMLElement
 */
export default Backed(class <%= className %> extends HTMLElement {
  created() {
    // good place to setup shadowRoot etc
  }
  /**
   * Called when Backed is finished setting up,
   * https://github.com/VandeurenGlenn/backed/wiki/Lifecycle-callback-methods
   */
  ready() {
    // This is where your code should go
  }
});
