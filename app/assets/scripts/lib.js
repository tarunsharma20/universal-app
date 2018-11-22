function modelBox (params) {
  const { id, closeBtn, beforeClose, show } = params;
  const self = this;

  self.container = document.getElementById(id);
  self.isVisible = false;

  if(closeBtn) {
    self.closeBtn  = document.getElementById(closeBtn);
    self.closeBtn.addEventListener('click', function () {
      self.close();
    });
  }

  if(typeof beforeClose === 'function') {
    self.beforeClose = beforeClose;
  } else {
    self.beforeClose = function () {};
  }

  if(show === true) {
    self.open();
  } else {
    self.close();
  }
};

modelBox.prototype.close = function () {
  const shouldClose = this.beforeClose();

  if(shouldClose === false) {
    return;
  }

  this.container.style.display = 'none';
  this.isVisible = false;
};

modelBox.prototype.open = function () {
  this.container.style.display = 'flex';
  this.isVisible = true;
};

const ModelBox = (function () {
  const modelBox = function () {
    const { id, closeBtn, beforeClose, show } = params;
    const self = this;

    self.container = Base.select('#' + id);
    self.isVisible = false;

    if(closeBtn) {
      self.closeBtn  = Base.select('#' + closeBtn);

      self.closeBtn.addEventListener('click', function () {
        self.close();
      });
    }

    if(typeof beforeClose === 'function') {
      self.beforeClose = beforeClose;
    } else {
      self.beforeClose = function () {};
    }

    if(show === true) {
      self.open();
    } else {
      self.close();
    }
  }

  modelBox.prototype.close = function () {
    const shouldClose = this.beforeClose();

    if(shouldClose === false) {
      return;
    }

    this.container.hide();
    this.isVisible = false;
  };

  modelBox.prototype.open = function () {
    this.container.show();
    this.isVisible = true;
  };

  return modelBox;
})();
