var _ = require('lodash'),
    EventEmitter = require('events').EventEmitter,
    AppDispatcher = require('../AppDispatcher.js');

var CHANGE_EVENT = 'change';

var _clicks = 0;

function incrementClicks() {
  _clicks++;
}

var Clicks = _.assign({}, EventEmitter.prototype, {
  getCount: function() {
    return _clicks;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  if (action.actionType === 'click') {
    incrementClicks();
    Clicks.emitChange();
  }
});

module.exports = Clicks;
