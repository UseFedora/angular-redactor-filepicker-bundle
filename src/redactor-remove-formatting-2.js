const NAME = 'removeFormatting';
const TAGS_TO_TRANSFORM_MAP = {};
const TAGS_TO_TRANSFORM = [
  'H1', 'H2', 'H3', 'H4', 'H5', 'HR', 'LI', 'PRE', 'CODE', 'BLOCKQUOTE',
];

TAGS_TO_TRANSFORM.forEach((tag) => TAGS_TO_TRANSFORM_MAP[tag] = true);

/**
 * Deletes an HTMLElement from the page, also deletes innerHTML.
 *
 * @param {HTMLElement}
 */
function deleteHTMLElement($element) {
  if (!$element.parentElement) {
    return;
  }

  $element.parentNode.removeChild($element);
}

/**
 * Deletes an HTMLElement from the page but maintains the innerHTML.
 *
 * @param {HTMLElement}
 */
function removeOuterTag(element) {
  if (!!element.innerHTML) {
    element.insertAdjacentHTML('beforebegin', element.innerHTML);
  }

  deleteHTMLElement(element);
}

/**
 * @param   {String}  nodeName
 * @returns {Boolean}
 */
function shouldRemove(nodeName) {
  return !TAGS_TO_TRANSFORM_MAP[nodeName] && nodeName !== 'P';
}

/**
 * @param   {String}  nodeName
 * @returns {Boolean}
 */
function shouldTransform(nodeName) {
  return TAGS_TO_TRANSFORM_MAP[nodeName];
}

/**
 * Deletes an HTMLElement from the page but maintains the innerHTML.
 *
 * @param {HTMLElement}
 */
function transformOuterTag(element, type) {
  const html = `<${type}>${element.innerHTML}</${type}>`;

  element.insertAdjacentHTML('beforebegin', html);

  deleteHTMLElement(element);
}

/**
 * The function that runs when you click the remove formatting button.
 *
 * NOTE: "this" is the redactor instance.
 */
function handleRemoveFormatting() {
  this.inline.removeFormat();

  const className = `${NAME}-${Date.now()}`;
  const html = `<span class="${className}">${this.selection.getHtml()}</span>`;

  this.selection.replaceWithHtml(html);

  const $marker = document.querySelector(`.${className}`);
  const $els = $marker.querySelectorAll('*');
  const $allElsInEditor = this.$editor[0].querySelectorAll('*');

  Array.prototype.forEach.call(($els), ($el) => {
    if (shouldTransform($el.nodeName)) {
      transformOuterTag($el, 'p');
    }
  });

  Array.prototype.forEach.call(($els), ($el) => {
    if (shouldRemove($el.nodeName)) {
      removeOuterTag($el, 'p');
    }
  });

  Array.prototype.forEach.call(($allElsInEditor), ($el) => {
    if (!$el.innerHTML) {
      removeOuterTag($el);
    }
  });

  removeOuterTag($marker);

  this.buffer.set();

  this.code.sync();
}

$.Redactor.prototype.removeFormatting = () => ({
  init() {
    const button = this.button.add('removeFormatting', 'Remove Formatting');

    this.button.addCallback(button, handleRemoveFormatting);
  }
});
