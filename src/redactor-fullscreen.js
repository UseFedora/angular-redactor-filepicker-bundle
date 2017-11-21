/* globals $, document, window */

$.Redactor.prototype.fullscreen = () => ({
  langs: {
    en: {
      fullscreen: 'Fullscreen',
    },
  },

  init() {
    this.fullscreen.isOpen = false;

    const button = this.button.add('fullscreen', this.lang.get('fullscreen'));

    this.button.addCallback(button, this.fullscreen.toggle);

    if (this.opts.fullscreen) {
      this.fullscreen.toggle();
    }
  },
  enable: () => {
    this.fullscreen.isOpened = false;
    this.button.setActive('fullscreen');
    this.fullscreen.isOpen = true;

    if (!this.opts.fullscreen) {
      this.selection.save();
    }

    if (this.opts.toolbarExternal) {
      this.fullscreen.toolcss = {};
      this.fullscreen.boxcss = {};
      this.fullscreen.toolcss.width = this.$toolbar.css('width');
      this.fullscreen.toolcss.top = this.$toolbar.css('top');
      this.fullscreen.toolcss.position = this.$toolbar.css('position');
      this.fullscreen.boxcss.top = this.$box.css('top');
    }

    this.fullscreen.height = this.core.editor().height();

    if (this.opts.maxHeight) {
      this.core.editor().css('max-height', '');
    }

    if (this.opts.minHeight) {
      this.core.editor().css('min-height', '');
    }

    if (!this.$fullscreenPlaceholder) {
      this.$fullscreenPlaceholder = $('<div/>');
    }

    this.$fullscreenPlaceholder.insertAfter(this.$box);

    this.$box.appendTo(document.body);

    this.$box.addClass('redactor-box-fullscreen');

    $('body, html').css('overflow', 'hidden');

    this.fullscreen.resize();

    if (!this.opts.fullscreen) {
      this.selection.restore();
    }

    this.toolbar.observeScrollDisable();

    $(window).on('resize.redactor-plugin-fullscreen', $.proxy(this.fullscreen.resize, this));

    $(document).scrollTop(0, 0);

    this.observe.load();

    setTimeout(() => {
      this.fullscreen.isOpened = true;
    }, 10);
  },

  disable() {
    this.button.setInactive('fullscreen');
    this.fullscreen.isOpened = undefined;
    this.fullscreen.isOpen = false;
    this.selection.save();

    $(window).off('resize.redactor-plugin-fullscreen');
    $('body, html').css('overflow', '');

    this.$box.insertBefore(this.$fullscreenPlaceholder);
    this.$fullscreenPlaceholder.remove();

    this.$box.removeClass('redactor-box-fullscreen').css({ width: 'auto', height: 'auto' });

    if (this.opts.toolbarExternal) {
      this.$box.css('top', this.fullscreen.boxcss.top);
      this.$toolbar.css({
        width: this.fullscreen.toolcss.width,
        top: this.fullscreen.toolcss.top,
        position: this.fullscreen.toolcss.position,
      });
    }

    if (this.opts.minHeight) {
      this.core.editor().css('minHeight', this.opts.minHeight);
    }

    if (this.opts.maxHeight) {
      this.core.editor().css('maxHeight', this.opts.maxHeight);
    }

    this.core.editor().css('height', 'auto');
    this.selection.restore();
    this.observe.load();
  },

  toggle() {
    return (this.fullscreen.isOpen) ? this.fullscreen.disable() : this.fullscreen.enable();
  },

  resize() {
    if (!this.fullscreen.isOpen) {
      return;
    }

    const toolbarHeight = this.button.toolbar().height();
    const padding = parseInt(this.core.editor().css('padding-top'), 10) + parseInt(this.core.editor().css('padding-bottom'), 10);
    const height = $(window).height() - toolbarHeight - padding;

    this.$box.width($(window).width()).height(height);

    if (this.opts.toolbarExternal) {
      this.$toolbar.css({
        top: '0px',
        position: 'absolute',
        width: '100%',
      });

      this.$box.css('top', `${toolbarHeight}px`);
    }

    this.core.editor().height(height);
  },
});
