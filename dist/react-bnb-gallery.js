'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var airbnbPropTypes = require('airbnb-prop-types');
var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var React__default = _interopDefault(React);
var classnames = _interopDefault(require('classnames'));
var omit = _interopDefault(require('lodash/omit'));
var FocusTrap = _interopDefault(require('focus-trap-react'));
var reactPortal = require('react-portal');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var DIRECTION_PREV = 'prev';
var DIRECTION_NEXT = 'next';
var FORWARDS = 'forwards';
var BACKWARDS = 'backwards';
var ARROW_LEFT_KEYCODE = 37;
var ARROW_RIGHT_KEYCODE = 39;
var ESC_KEYCODE = 27;
var THUMBNAIL_WIDTH = 100;
var THUMBNAIL_HEIGHT = 67;
var THUMBNAIL_OFFSET = 10;
var DEFAULT_OPACITY = 1;
var DEFAULT_COLOR = 'rgba(0,0,0,1)';
var NORMAL_COLOR = 'rgba(255,255,255,1)';
var INVERSE_COLOR = 'rgba(1,1,1,1)';
var DEFAULT_Z_INDEX = 2000;
var defaultPhotoProps = {
  photo: undefined,
  number: undefined,
  caption: undefined,
  subcaption: undefined,
  thumbnail: undefined
};

var SlideDirectionShape = PropTypes.oneOf([FORWARDS, BACKWARDS]);

var PhotoShape = PropTypes.shape({
  photo: PropTypes.string.isRequired,
  number: PropTypes.number,
  caption: PropTypes.string,
  subcaption: PropTypes.string,
  thumbnail: PropTypes.string
});

var PhotosShape = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string.isRequired), PropTypes.arrayOf(PhotoShape)]);

var noPhotosProvided = 'No photos to show';
var showPhotoList = 'Show photo list';
var hidePhotoList = 'Hide photo list';
var defaultPhrases = {
  noPhotosProvided: noPhotosProvided,
  showPhotoList: showPhotoList,
  hidePhotoList: hidePhotoList
};

function defaultPhrases$1() {
  return Object.keys(defaultPhrases$1).reduce(function (phrases, key) {
    return _objectSpread({}, phrases, _defineProperty({}, key, PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node])));
  }, {});
}

var galleryPropTypes = airbnbPropTypes.forbidExtraProps({
  activePhotoIndex: airbnbPropTypes.nonNegativeInteger,
  activePhotoPressed: PropTypes.func,
  direction: SlideDirectionShape,
  nextButtonPressed: PropTypes.func,
  prevButtonPressed: PropTypes.func,
  showThumbnails: PropTypes.bool,
  photos: PhotosShape,
  preloadSize: airbnbPropTypes.nonNegativeInteger,
  wrap: PropTypes.bool,
  phrases: PropTypes.shape(defaultPhrases$1(defaultPhrases)),
  light: PropTypes.bool
});

var noop = (function () {});

var galleryDefaultProps = {
  activePhotoIndex: 0,
  activePhotoPressed: noop,
  direction: FORWARDS,
  nextButtonPressed: noop,
  prevButtonPressed: noop,
  showThumbnails: true,
  photos: [],
  preloadSize: 5,
  wrap: false,
  phrases: defaultPhrases,
  light: false
};

var imagePropTypes = airbnbPropTypes.forbidExtraProps({
  onLoad: PropTypes.func,
  onError: PropTypes.func
});

var imageDefaultProps = {
  onLoad: noop,
  onError: noop
};

var _jsxFileName = "/app/src/components/LoadingSpinner.js";
var propTypes = airbnbPropTypes.forbidExtraProps({
  show: PropTypes.bool
});
var defaultProps = {
  show: true
};

var LoadingSpinner = function LoadingSpinner(_ref) {
  var show = _ref.show;
  return show && React__default.createElement("div", {
    className: "loading-spinner",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  });
};

LoadingSpinner.propTypes = propTypes;
LoadingSpinner.defaultProps = defaultProps;

var _jsxFileName$1 = "/app/src/components/Image.js";
var propTypes$1 = airbnbPropTypes.forbidExtraProps(_objectSpread({}, imagePropTypes, {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}));

var defaultProps$1 = _objectSpread({}, imageDefaultProps, {
  style: null,
  className: null,
  alt: ''
});

var defaultState = {
  loading: true,
  withError: false
};

var Image =
/*#__PURE__*/
function (_Component) {
  _inherits(Image, _Component);

  function Image(props) {
    var _this;

    _classCallCheck(this, Image);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Image).call(this, props));
    _this.state = defaultState;
    _this.onLoad = _this.onLoad.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onError = _this.onError.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Image, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.src !== this.props.src) {
        this.setState(defaultState);
      }
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      var _this2 = this;

      var onLoad = this.props.onLoad; // wait a bit to show the final picture

      setTimeout(function () {
        onLoad();

        _this2.setState({
          loading: false,
          withError: false
        });
      }, 100);
    }
  }, {
    key: "onError",
    value: function onError() {
      var onError = this.props.onError;
      onError();
      this.setState({
        loading: false,
        withError: true
      });
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      var _this$props = this.props,
          alt = _this$props.alt,
          src = _this$props.src,
          style = _this$props.style,
          className = _this$props.className;
      var _this$state = this.state,
          loading = _this$state.loading,
          withError = _this$state.withError;
      var classNames = [className, 'media-image'];
      var components = []; // the loading spinner
      // TODO: make this 'LoadingSpinner' component customizable

      if (loading) {
        components.push(React__default.createElement(LoadingSpinner, {
          key: ".pictureLoadingSpinner",
          __source: {
            fileName: _jsxFileName$1,
            lineNumber: 95
          },
          __self: this
        }));
      } // if no loading, then return the
      // picture only if no error ocurred


      if (!withError) {
        components.push(React__default.createElement("img", {
          alt: alt,
          key: ".pictureComponent",
          className: classnames(classNames),
          onLoad: this.onLoad,
          onError: this.onError,
          src: src,
          style: style,
          __source: {
            fileName: _jsxFileName$1,
            lineNumber: 101
          },
          __self: this
        }));
      } // TODO: show a custom message indicating the
      // error ocurred while loading the picture


      return components;
    }
  }, {
    key: "render",
    value: function render() {
      var loading = this.state.loading;
      var wrapperClassNames = ['picture', loading && 'loading']; // render the picture element

      var picture = this.renderImage();
      return React__default.createElement("div", {
        className: classnames(wrapperClassNames),
        __source: {
          fileName: _jsxFileName$1,
          lineNumber: 132
        },
        __self: this
      }, picture);
    }
  }]);

  return Image;
}(React.Component);

Image.propTypes = propTypes$1;
Image.defaultProps = defaultProps$1;

var _jsxFileName$2 = "/app/src/components/GalleryPhoto.js";
var propTypes$2 = airbnbPropTypes.forbidExtraProps(_objectSpread({}, imagePropTypes, {
  photo: PhotoShape,
  onPress: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func
}));

var defaultProps$2 = _objectSpread({}, imageDefaultProps, {
  photo: null,
  onPress: noop,
  onTouchStart: noop,
  onTouchMove: noop,
  onTouchEnd: noop
});

var GalleryPhoto =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GalleryPhoto, _PureComponent);

  function GalleryPhoto(props) {
    var _this;

    _classCallCheck(this, GalleryPhoto);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GalleryPhoto).call(this, props));
    _this.onPress = _this.onPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(GalleryPhoto, [{
    key: "onPress",
    value: function onPress() {
      var onPress = this.props.onPress;
      onPress();
    }
  }, {
    key: "renderPhoto",
    value: function renderPhoto() {
      var _this$props = this.props,
          photo = _this$props.photo,
          onTouchStart = _this$props.onTouchStart,
          onTouchMove = _this$props.onTouchMove,
          onTouchEnd = _this$props.onTouchEnd,
          rest = _objectWithoutProperties(_this$props, ["photo", "onTouchStart", "onTouchMove", "onTouchEnd"]);

      if (!photo) {
        return null;
      }

      var imageProps = omit(rest, ['onPress']);
      return React__default.createElement("button", {
        type: "button",
        onClick: this.onPress,
        className: "photo-button",
        onTouchStart: onTouchStart,
        onTouchMove: onTouchMove,
        onTouchEnd: onTouchEnd,
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 64
        },
        __self: this
      }, React__default.createElement(Image, _extends({
        alt: photo.caption || '',
        className: "photo",
        src: photo.photo
      }, imageProps, {
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 72
        },
        __self: this
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var className = classnames('gallery-media-photo', 'gallery-media-photo--block', 'gallery-media-cover');
      var photoRendered = this.renderPhoto();
      return React__default.createElement("ul", {
        className: "gallery-images--ul",
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 92
        },
        __self: this
      }, React__default.createElement("li", {
        className: className,
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 93
        },
        __self: this
      }, photoRendered));
    }
  }]);

  return GalleryPhoto;
}(React.PureComponent);

GalleryPhoto.propTypes = propTypes$2;
GalleryPhoto.defaultProps = defaultProps$2;

var _jsxFileName$3 = "/app/src/components/GalleryThumbnail.js";
var thumbnailStyle = {
  width: THUMBNAIL_WIDTH,
  height: THUMBNAIL_HEIGHT
};
var propTypes$3 = airbnbPropTypes.forbidExtraProps({
  active: PropTypes.bool,
  photo: PhotoShape,
  onPress: PropTypes.func,
  number: airbnbPropTypes.nonNegativeInteger
});
var defaultProps$3 = {
  active: false,
  photo: null,
  onPress: noop,
  number: 0
};

var GalleryThumbnail =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GalleryThumbnail, _PureComponent);

  function GalleryThumbnail() {
    _classCallCheck(this, GalleryThumbnail);

    return _possibleConstructorReturn(this, _getPrototypeOf(GalleryThumbnail).apply(this, arguments));
  }

  _createClass(GalleryThumbnail, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          photo = _this$props.photo,
          onPress = _this$props.onPress,
          number = _this$props.number;
      var className = classnames('thumbnail-button', active && 'active');
      return React__default.createElement("button", {
        type: "button",
        "aria-label": photo.caption,
        className: className,
        "data-photo-index": number,
        onClick: onPress,
        disabled: false,
        __source: {
          fileName: _jsxFileName$3,
          lineNumber: 54
        },
        __self: this
      }, React__default.createElement(Image, {
        alt: photo.caption,
        src: photo.thumbnail || photo.photo,
        className: "thumbnail",
        style: thumbnailStyle,
        __source: {
          fileName: _jsxFileName$3,
          lineNumber: 62
        },
        __self: this
      }));
    }
  }]);

  return GalleryThumbnail;
}(React.PureComponent);

GalleryThumbnail.propTypes = propTypes$3;
GalleryThumbnail.defaultProps = defaultProps$3;

var _jsxFileName$4 = "/app/src/components/GalleryTogglePhotoList.js";
var propTypes$4 = airbnbPropTypes.forbidExtraProps({
  isOpened: PropTypes.bool,
  onPress: PropTypes.func,
  phrases: PropTypes.shape(defaultPhrases$1(defaultPhrases))
});
var defaultProps$4 = {
  isOpened: true,
  onPress: noop,
  phrases: defaultPhrases
};

var GalleryTogglePhotoList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GalleryTogglePhotoList, _PureComponent);

  function GalleryTogglePhotoList() {
    _classCallCheck(this, GalleryTogglePhotoList);

    return _possibleConstructorReturn(this, _getPrototypeOf(GalleryTogglePhotoList).apply(this, arguments));
  }

  _createClass(GalleryTogglePhotoList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isOpened = _this$props.isOpened,
          onPress = _this$props.onPress,
          _this$props$phrases = _this$props.phrases,
          showLabel = _this$props$phrases.showPhotoList,
          hideLabel = _this$props$phrases.hidePhotoList;
      var label = isOpened ? hideLabel : showLabel;
      var className = classnames('gallery-thumbnails--toggle', isOpened ? 'hide' : 'open');
      return React__default.createElement("button", {
        type: "button",
        className: className,
        onClick: onPress,
        __source: {
          fileName: _jsxFileName$4,
          lineNumber: 43
        },
        __self: this
      }, label);
    }
  }]);

  return GalleryTogglePhotoList;
}(React.PureComponent);

GalleryTogglePhotoList.propTypes = propTypes$4;
GalleryTogglePhotoList.defaultProps = defaultProps$4;

function calculateThumbnailsContainerDimension(total) {
  return THUMBNAIL_WIDTH * total + (THUMBNAIL_OFFSET * total - THUMBNAIL_OFFSET);
}

function calculateThumbnailsLeftScroll(current, total, bounding) {
  var half = bounding.width / 2 - THUMBNAIL_WIDTH / 2;
  var thumbnailsOffset = current * THUMBNAIL_WIDTH + current * THUMBNAIL_OFFSET - half;
  var calculatedScrollLeft = 0;

  if (thumbnailsOffset < 0) {
    return calculatedScrollLeft;
  }

  var thumbnailsPerRow = bounding.width / (THUMBNAIL_WIDTH + THUMBNAIL_OFFSET);
  var thumbnailsHalf = Math.round(thumbnailsPerRow / 2);
  var thumbnailsLeft = total - (current + 1);

  if (thumbnailsLeft < thumbnailsHalf) {
    calculatedScrollLeft = calculateThumbnailsContainerDimension(total) - bounding.width;
  } else {
    calculatedScrollLeft = thumbnailsOffset;
  }

  return -Math.abs(calculatedScrollLeft);
}

var _jsxFileName$5 = "/app/src/components/GalleryCaption.js";
var propTypes$5 = airbnbPropTypes.forbidExtraProps({
  showThumbnails: PropTypes.bool,
  current: airbnbPropTypes.nonNegativeInteger,
  photos: PhotosShape,
  onPress: PropTypes.func,
  phrases: PropTypes.shape(defaultPhrases$1(defaultPhrases))
});
var defaultProps$5 = {
  showThumbnails: true,
  current: 0,
  photos: [],
  onPress: noop,
  phrases: defaultPhrases
};

var GalleryCaption =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GalleryCaption, _PureComponent);

  function GalleryCaption(props) {
    var _this;

    _classCallCheck(this, GalleryCaption);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GalleryCaption).call(this, props));
    var _this$props = _this.props,
        showThumbnails = _this$props.showThumbnails,
        photos = _this$props.photos;
    _this.state = {
      showThumbnails: showThumbnails
    };
    _this.thumbnailsWrapperRef = null;
    _this.thumbnailsListRef = null;
    _this.hasMoreThanOnePhoto = photos.length > 1;
    _this.onThumbnailPress = _this.onThumbnailPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setGalleryFigcaptionRef = _this.setGalleryFigcaptionRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setGalleryThubmanilsRef = _this.setGalleryThubmanilsRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleThumbnails = _this.toggleThumbnails.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(GalleryCaption, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var current = this.props.current;

      if (current !== prevProps.current) {
        this.setThumbnailsWrapperScrollLeft(current);
      }
    }
  }, {
    key: "onThumbnailPress",
    value: function onThumbnailPress(event) {
      var _this$props2 = this.props,
          onPress = _this$props2.onPress,
          photos = _this$props2.photos;
      var index = parseInt(event.currentTarget.dataset.photoIndex, 10);

      if (index >= 0 && index <= photos.length - 1) {
        onPress(index);
      }
    }
  }, {
    key: "setThumbnailsWrapperScrollLeft",
    value: function setThumbnailsWrapperScrollLeft(current) {
      var photos = this.props.photos;
      var bounding = this.thumbnailsWrapperRef.getBoundingClientRect();
      var scrollLeft = calculateThumbnailsLeftScroll(current, photos.length, bounding);
      this.thumbnailsListRef.style.marginLeft = "".concat(scrollLeft, "px");
    }
  }, {
    key: "getPhotoByIndex",
    value: function getPhotoByIndex(index) {
      var photos = this.props.photos;
      return photos[index];
    }
  }, {
    key: "setGalleryFigcaptionRef",
    value: function setGalleryFigcaptionRef(element) {
      this.thumbnailsWrapperRef = element;
    }
  }, {
    key: "setGalleryThubmanilsRef",
    value: function setGalleryThubmanilsRef(element) {
      this.thumbnailsListRef = element;
    }
  }, {
    key: "toggleThumbnails",
    value: function toggleThumbnails() {
      this.setState(function (prevState) {
        return {
          showThumbnails: !prevState.showThumbnails
        };
      });
    }
  }, {
    key: "renderThumbnail",
    value: function renderThumbnail(photo, index, onPress) {
      var current = this.props.current;
      return React__default.createElement(GalleryThumbnail, {
        active: index === current,
        photo: photo,
        onPress: onPress,
        number: index,
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 108
        },
        __self: this
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          current = _this$props3.current,
          photos = _this$props3.photos,
          phrases = _this$props3.phrases;
      var showThumbnails = this.state.showThumbnails;
      var className = classnames('gallery-figcaption', !showThumbnails && 'hide');
      var currentPhoto = this.getPhotoByIndex(current);
      var captionThumbnailsWrapperWidth = calculateThumbnailsContainerDimension(photos.length);
      return React__default.createElement("figcaption", {
        className: className,
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 137
        },
        __self: this
      }, React__default.createElement("div", {
        className: "gallery-figcaption--content",
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 138
        },
        __self: this
      }, React__default.createElement("div", {
        className: "gallery-figcaption--inner",
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 139
        },
        __self: this
      }, React__default.createElement("div", {
        className: "gallery-figcaption--info",
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 140
        },
        __self: this
      }, React__default.createElement("div", {
        className: "caption-left",
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 141
        },
        __self: this
      }, currentPhoto.caption && React__default.createElement("h3", {
        className: "photo-caption",
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 143
        },
        __self: this
      }, currentPhoto.caption), currentPhoto.subcaption && React__default.createElement("p", {
        className: "photo-subcaption",
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 148
        },
        __self: this
      }, currentPhoto.subcaption)), this.hasMoreThanOnePhoto && React__default.createElement("div", {
        className: "caption-right",
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 154
        },
        __self: this
      }, React__default.createElement(GalleryTogglePhotoList, {
        phrases: phrases,
        isOpened: showThumbnails,
        onPress: this.toggleThumbnails,
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 155
        },
        __self: this
      }))), this.hasMoreThanOnePhoto && React__default.createElement("div", {
        className: "gallery-figcaption--thumbnails",
        "aria-hidden": false,
        ref: this.setGalleryFigcaptionRef,
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 164
        },
        __self: this
      }, React__default.createElement("div", {
        className: "caption-thumbnails",
        style: {
          width: captionThumbnailsWrapperWidth
        },
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 169
        },
        __self: this
      }, React__default.createElement("ul", {
        className: "thumbnails-list",
        ref: this.setGalleryThubmanilsRef,
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 173
        },
        __self: this
      }, photos.map(function (photo, index) {
        return React__default.createElement("li", {
          key: photo.photo,
          __source: {
            fileName: _jsxFileName$5,
            lineNumber: 178
          },
          __self: this
        }, _this2.renderThumbnail(photo, index, _this2.onThumbnailPress));
      })))))));
    }
  }]);

  return GalleryCaption;
}(React.PureComponent);

GalleryCaption.propTypes = propTypes$5;
GalleryCaption.defaultProps = defaultProps$5;

var _jsxFileName$6 = "/app/src/components/GalleryControl.js";
var svgAttributes = {
  viewBox: '0 0 18 18',
  role: 'presentation',
  focusable: false,
  'aria-hidden': true
};
var controlStyle = {
  height: '2.8em',
  width: '2.8em',
  fill: NORMAL_COLOR
};
var controlStyleLight = {
  fill: INVERSE_COLOR
};
var propTypes$6 = airbnbPropTypes.forbidExtraProps({
  arrow: PropTypes.string,
  onPress: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  light: PropTypes.bool
});
var defaultProps$6 = {
  arrow: null,
  onPress: noop,
  label: '',
  className: null,
  disabled: false,
  light: false
};

var GalleryControl =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(GalleryControl, _React$PureComponent);

  function GalleryControl(props) {
    var _this;

    _classCallCheck(this, GalleryControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GalleryControl).call(this, props));
    _this.onButtonPress = _this.onButtonPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(GalleryControl, [{
    key: "onButtonPress",
    value: function onButtonPress() {
      var onPress = this.props.onPress;
      onPress();
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          arrow = _this$props.arrow,
          label = _this$props.label,
          className = _this$props.className,
          disabled = _this$props.disabled,
          light = _this$props.light;
      return React__default.createElement("button", {
        type: "button",
        className: classnames('gallery-control', className),
        onClick: this.onButtonPress,
        disabled: disabled,
        "aria-label": label,
        __source: {
          fileName: _jsxFileName$6,
          lineNumber: 71
        },
        __self: this
      }, React__default.createElement("svg", _extends({}, svgAttributes, {
        style: _objectSpread({}, controlStyle, light && controlStyleLight),
        __source: {
          fileName: _jsxFileName$6,
          lineNumber: 78
        },
        __self: this
      }), React__default.createElement("path", {
        d: arrow,
        fillRule: "evenodd",
        __source: {
          fileName: _jsxFileName$6,
          lineNumber: 85
        },
        __self: this
      })));
    }
  }]);

  return GalleryControl;
}(React__default.PureComponent);

GalleryControl.propTypes = propTypes$6;
GalleryControl.defaultProps = defaultProps$6;

var _jsxFileName$7 = "/app/src/components/GalleryPrevButton.js";
var PREV_ARROW = 'm13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z';
var propTypes$7 = airbnbPropTypes.forbidExtraProps({
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  light: PropTypes.bool
});
var defaultProps$7 = {
  onPress: noop,
  disabled: false,
  light: false
};

var GalleryPrevButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GalleryPrevButton, _PureComponent);

  function GalleryPrevButton() {
    _classCallCheck(this, GalleryPrevButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(GalleryPrevButton).apply(this, arguments));
  }

  _createClass(GalleryPrevButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onPress = _this$props.onPress,
          disabled = _this$props.disabled,
          light = _this$props.light;
      return React__default.createElement(GalleryControl, {
        className: "gallery-control--prev",
        onPress: onPress,
        arrow: PREV_ARROW,
        disabled: disabled,
        light: light,
        __source: {
          fileName: _jsxFileName$7,
          lineNumber: 32
        },
        __self: this
      });
    }
  }]);

  return GalleryPrevButton;
}(React.PureComponent);

GalleryPrevButton.propTypes = propTypes$7;
GalleryPrevButton.defaultProps = defaultProps$7;

var _jsxFileName$8 = "/app/src/components/GalleryNextButton.js";
var NEXT_ARROW = 'm4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z';
var propTypes$8 = airbnbPropTypes.forbidExtraProps({
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  light: PropTypes.bool
});
var defaultProps$8 = {
  onPress: noop,
  disabled: false,
  light: false
};

var GalleryNextButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GalleryNextButton, _PureComponent);

  function GalleryNextButton() {
    _classCallCheck(this, GalleryNextButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(GalleryNextButton).apply(this, arguments));
  }

  _createClass(GalleryNextButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onPress = _this$props.onPress,
          disabled = _this$props.disabled,
          light = _this$props.light;
      return React__default.createElement(GalleryControl, {
        className: "gallery-control--next",
        onPress: onPress,
        arrow: NEXT_ARROW,
        disabled: disabled,
        light: light,
        __source: {
          fileName: _jsxFileName$8,
          lineNumber: 32
        },
        __self: this
      });
    }
  }]);

  return GalleryNextButton;
}(React.PureComponent);

GalleryNextButton.propTypes = propTypes$8;
GalleryNextButton.defaultProps = defaultProps$8;

var _jsxFileName$9 = "/app/src/components/Gallery.js";

var propTypes$9 = _objectSpread({}, galleryPropTypes);

var defaultProps$9 = _objectSpread({}, galleryDefaultProps);

var Gallery =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Gallery, _PureComponent);

  function Gallery(props) {
    var _this;

    _classCallCheck(this, Gallery);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Gallery).call(this, props));
    var _this$props = _this.props,
        activePhotoIndex = _this$props.activePhotoIndex,
        photos = _this$props.photos,
        wrap = _this$props.wrap;
    _this.state = {
      activePhotoIndex: activePhotoIndex,
      hidePrevButton: wrap && activePhotoIndex === 0,
      hideNextButton: wrap && activePhotoIndex === photos.length - 1,
      controlsDisabled: true,
      touchStartInfo: null,
      touchEndInfo: null,
      touchMoved: false
    };
    _this.lastPreloadIndex = 0;
    _this.preloadedPhotos = [];
    _this.hasPhotos = photos.length > 0;
    _this.hasMoreThanOnePhoto = photos.length > 1;
    _this.move = _this.move.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.prev = _this.prev.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.next = _this.next.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPhotoLoad = _this.onPhotoLoad.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPhotoError = _this.onPhotoError.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPhotoPress = _this.onPhotoPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTouchStart = _this.onTouchStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTouchMove = _this.onTouchMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onThumbnailPress = _this.onThumbnailPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPrevButtonPress = _this.onPrevButtonPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onNextButtonPress = _this.onNextButtonPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Gallery, [{
    key: "onNextButtonPress",
    value: function onNextButtonPress() {
      var nextButtonPressed = this.props.nextButtonPressed;
      this.next();
      nextButtonPressed();
    }
  }, {
    key: "onPrevButtonPress",
    value: function onPrevButtonPress() {
      var prevButtonPressed = this.props.prevButtonPressed;
      this.prev();
      prevButtonPressed();
    }
  }, {
    key: "onPhotoLoad",
    value: function onPhotoLoad() {
      return this.setState({
        controlsDisabled: false
      });
    }
  }, {
    key: "onPhotoError",
    value: function onPhotoError() {
      return this.setState({
        controlsDisabled: false
      });
    }
  }, {
    key: "onPhotoPress",
    value: function onPhotoPress() {
      var activePhotoPressed = this.props.activePhotoPressed;
      this.move(DIRECTION_NEXT);
      activePhotoPressed();
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event) {
      this.setState({
        touchStartInfo: event.targetTouches[0]
      });
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(event) {
      this.setState({
        touchMoved: true,
        touchEndInfo: event.targetTouches[0]
      });
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd() {
      var _this$state = this.state,
          touchStartInfo = _this$state.touchStartInfo,
          touchEndInfo = _this$state.touchEndInfo,
          touchMoved = _this$state.touchMoved;

      if (touchMoved) {
        if (touchStartInfo.screenX < touchEndInfo.screenX) {
          this.onPrevButtonPress();
        } else if (touchStartInfo.screenX > touchEndInfo.screenX) {
          this.onNextButtonPress();
        }
      }

      this.setState({
        touchMoved: false
      });
    }
  }, {
    key: "onThumbnailPress",
    value: function onThumbnailPress(index) {
      this.to(index);
    }
  }, {
    key: "getPhotoByIndex",
    value: function getPhotoByIndex(index) {
      var photos = this.props.photos;
      return photos[index];
    }
  }, {
    key: "getItemByDirection",
    value: function getItemByDirection(direction, activeIndex) {
      var _this$props2 = this.props,
          photos = _this$props2.photos,
          wrap = _this$props2.wrap;
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;
      var lastItemIndex = photos.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && wrap) {
        return activeIndex;
      }

      var delta = isPrevDirection ? -1 : 1;
      var itemIndex = (activeIndex + delta) % photos.length;
      return itemIndex === -1 ? photos.length - 1 : itemIndex;
    }
  }, {
    key: "to",
    value: function to(index) {
      var photos = this.props.photos;
      var activePhotoIndex = this.state.activePhotoIndex;

      if (index > photos.length - 1 || index < 0 || activePhotoIndex === index) {
        return; // nothing to do
      }

      var direction = index > activePhotoIndex ? DIRECTION_NEXT : DIRECTION_PREV;
      this.move(direction, index);
    }
  }, {
    key: "move",
    value: function move(direction) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var activePhotoIndex = this.state.activePhotoIndex;
      var nextElementIndex = index !== false ? index : this.getItemByDirection(direction, activePhotoIndex);
      this.wrapCheck(direction, nextElementIndex);
      this.setState({
        activePhotoIndex: nextElementIndex
      });
    }
  }, {
    key: "next",
    value: function next() {
      return this.move(DIRECTION_NEXT);
    }
  }, {
    key: "prev",
    value: function prev() {
      return this.move(DIRECTION_PREV);
    }
  }, {
    key: "wrapCheck",
    value: function wrapCheck(direction, nextElementIndex) {
      var _this$props3 = this.props,
          photos = _this$props3.photos,
          wrap = _this$props3.wrap;

      if (wrap) {
        this.setState({
          hideNextButton: nextElementIndex === photos.length - 1,
          hidePrevButton: nextElementIndex === 0
        });
      }
    }
  }, {
    key: "renderControls",
    value: function renderControls() {
      var light = this.props.light;
      var _this$state2 = this.state,
          hidePrevButton = _this$state2.hidePrevButton,
          hideNextButton = _this$state2.hideNextButton,
          controlsDisabled = _this$state2.controlsDisabled;
      var controls = [];

      if (this.hasMoreThanOnePhoto) {
        // previous control
        if (!hidePrevButton) {
          controls.push(React__default.createElement(GalleryPrevButton, {
            key: ".prevControl",
            disabled: controlsDisabled,
            onPress: this.onPrevButtonPress,
            light: light,
            __source: {
              fileName: _jsxFileName$9,
              lineNumber: 208
            },
            __self: this
          }));
        } // next control


        if (!hideNextButton) {
          controls.push(React__default.createElement(GalleryNextButton, {
            key: ".nextControl",
            disabled: controlsDisabled,
            onPress: this.onNextButtonPress,
            light: light,
            __source: {
              fileName: _jsxFileName$9,
              lineNumber: 220
            },
            __self: this
          }));
        }
      }

      return controls;
    }
  }, {
    key: "renderPreloadPhotos",
    value: function renderPreloadPhotos() {
      var photos = this.props.photos;
      return photos.map(function (photo) {
        return React__default.createElement("img", {
          key: photo.photo,
          alt: photo.photo,
          src: photo.photo,
          __source: {
            fileName: _jsxFileName$9,
            lineNumber: 237
          },
          __self: this
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          photos = _this$props4.photos,
          showThumbnails = _this$props4.showThumbnails,
          phrases = _this$props4.phrases;
      var emptyMessage = phrases.noPhotosProvided;
      var activePhotoIndex = this.state.activePhotoIndex; // preload photos

      var galleryModalPreloadPhotos = this.renderPreloadPhotos();
      var controls = this.renderControls();
      var current = this.getPhotoByIndex(activePhotoIndex);
      return React__default.createElement("div", {
        className: "gallery",
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 268
        },
        __self: this
      }, React__default.createElement("div", {
        className: "gallery-modal--preload",
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 269
        },
        __self: this
      }, galleryModalPreloadPhotos), React__default.createElement("div", {
        className: "gallery-main",
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 272
        },
        __self: this
      }, controls, React__default.createElement("div", {
        className: "gallery-photos",
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 274
        },
        __self: this
      }, this.hasPhotos ? React__default.createElement("div", {
        className: "gallery-photo",
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 276
        },
        __self: this
      }, React__default.createElement("div", {
        className: "gallery-photo--current",
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 277
        },
        __self: this
      }, React__default.createElement(GalleryPhoto, {
        photo: current,
        onLoad: this.onPhotoLoad,
        onError: this.onPhotoError,
        onPress: this.onPhotoPress,
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd,
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 278
        },
        __self: this
      }))) : React__default.createElement("div", {
        className: "gallery-empty",
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 290
        },
        __self: this
      }, emptyMessage))), showThumbnails && current && React__default.createElement(GalleryCaption, {
        phrases: phrases,
        current: activePhotoIndex,
        photos: photos,
        onPress: this.onThumbnailPress,
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 297
        },
        __self: this
      }));
    }
  }]);

  return Gallery;
}(React.PureComponent);

Gallery.propTypes = propTypes$9;
Gallery.defaultProps = defaultProps$9;

var _jsxFileName$a = "/app/src/components/GalleryCloseButton.js";
var CLOSE_PATH = 'm23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22';
var buttonStyle = {
  height: '2em',
  width: '2em',
  display: 'block',
  fill: NORMAL_COLOR
};
var buttonStyleLight = {
  fill: INVERSE_COLOR
};
var buttonProps = {
  viewBox: '0 0 24 24',
  role: 'img',
  focusable: false
};
var propTypes$a = airbnbPropTypes.forbidExtraProps({
  onPress: PropTypes.func,
  light: PropTypes.bool
});
var defaultProps$a = {
  onPress: noop,
  light: false
};

var GalleryCloseButton = function GalleryCloseButton(_ref) {
  var onPress = _ref.onPress,
      light = _ref.light;
  return React__default.createElement("button", {
    onClick: onPress,
    className: "gallery-close",
    type: "button",
    "aria-busy": false,
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 45
    },
    __self: this
  }, React__default.createElement("svg", _extends({}, buttonProps, {
    style: _objectSpread({}, buttonStyle, light && buttonStyleLight),
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 51
    },
    __self: this
  }), React__default.createElement("path", {
    d: CLOSE_PATH,
    fillRule: "evenodd",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 58
    },
    __self: this
  })));
};

GalleryCloseButton.propTypes = propTypes$a;
GalleryCloseButton.defaultProps = defaultProps$a;

var MIN = 0;
var MAX = 1; // eslint-disable-next-line consistent-return

function opacityValidation(props, propName) {
  if (props[propName] < MIN || props[propName] > MAX) {
    return new Error('Invalid value for opacity');
  }
}

function processPhoto(photo, index) {
  return _extends({}, defaultPhotoProps, typeof photo === 'string' ? {
    number: index + 1,
    photo: photo
  } : _objectSpread({}, photo, {
    number: index + 1
  }));
}
function getPhotos(photos) {
  return photos.map(processPhoto);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".gallery-modal {\n  position: fixed;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  z-index: 2000;\n}\n\n.gallery-modal .gallery-modal--overlay {\n  background-color: rgba(0,0,0,1);\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  right: 0;\n  bottom: 0;\n  z-index: 0;\n}\n\n.gallery-modal--preload {\n  display: none;\n}\n\n.gallery-modal--container {\n  position: fixed;\n  z-index: 2000;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow-y: auto;\n  -webkit-transform: translate3d(0, 0, 0);\n  z-index: 1;\n}\n\n.gallery-modal--table {\n  display: table;\n  table-layout: fixed;\n  height: 100%;\n  width: 100%;\n}\n\n.gallery-modal--cell {\n  display: table-cell;\n  height: 100%;\n  width: 100%;\n  vertical-align: middle;\n}\n\n.gallery-modal--content {\n  position: relative;\n  overflow: hidden;\n  -webkit-border-radius: 2px;\n  -moz-border-radius: 2px;\n  border-radius: 2px;\n  margin-left: auto;\n  margin-right: auto;\n  background-color: transparent;\n  height: 100%;\n  max-width: 100%;\n}\n\n.gallery-content {\n  display: table;\n  width: 100%;\n  height: 100%;\n}\n\n.gallery-top {\n  display: table-row;\n}\n\n.gallery-top--inner {\n  padding: 60px 15px 20px;\n}\n\n.gallery {\n  display: table-row;\n  height: 100%;\n  font-size: 1rem;\n}\n\n.gallery .gallery-main {\n  position: relative;\n  z-index: 9;\n}\n\n.gallery .gallery-photos {\n  width: 100%;\n  max-width: 105vh;\n  margin: 0px auto;\n}\n\n.gallery .gallery-photo {\n  position: relative;\n  width: 100%;\n  height: 0px;\n  padding-bottom: 75%;\n}\n\n.gallery .gallery-photos .gallery-empty {\n  color: #ffffff;\n  font-size: 1.45rem;\n  display: block;\n  text-align: center;\n  padding: 25% 0;\n}\n\n.gallery .gallery-photo--current {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n}\n\n.gallery ul.gallery-images--ul {\n  position: relative;\n  height: 100%;\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.gallery ul.gallery-images--ul li.gallery-media-photo {\n  opacity: 1;\n  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';\n  z-index: 2;\n}\n\n.gallery ul.gallery-images--ul li.gallery-media-photo,\n.gallery ul.gallery-images--ul li.gallery-media-photo div.picture {\n  background-color: transparent;\n  cursor: pointer;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n.gallery ul.gallery-images--ul li.gallery-media-photo button.photo-button {\n  display: block;\n  background: none;\n  border-width: 0;\n  cursor: pointer;\n  padding: 0 !important;\n  -webkit-appearance: button;\n}\n\n.gallery ul.gallery-images--ul li.gallery-media-photo button.photo-button:focus,\n.gallery ul.gallery-images--ul li.gallery-media-photo button.photo-button:active {\n  outline: none;\n  border-width: 0;\n}\n\n.gallery ul.gallery-images--ul li.gallery-media-photo div.picture img.photo {\n  max-height: 100%;\n  max-width: 100%;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: 0 auto;\n  z-index: 0;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n\n.gallery .gallery-control {\n  cursor: pointer;\n  position: absolute;\n  top: 0px;\n  height: 100%;\n  z-index: 3;\n  font-size: 0.5em;\n  width: 40px;\n  background: none;\n  border-width: 0px;\n  border-style: initial;\n  border-color: initial;\n  border-image: initial;\n}\n\n.gallery .gallery-control--prev {\n  left: 0;\n}\n\n.gallery .gallery-control--next {\n  right: 0;\n}\n\n.gallery-figcaption {\n  background-image: none;\n  background-color: transparent;\n  position: relative;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 2;\n  text-align: center;\n  color: rgb(255, 255, 255);\n  overflow: hidden;\n  border-radius: 0;\n}\n\n.mode-light .gallery-figcaption {\n  color: #111111;\n}\n\n.gallery-figcaption--content {\n  max-width: 105vh;\n  margin-left: auto;\n  margin-right: auto;\n  overflow: hidden;\n}\n\n.gallery-figcaption--inner {\n  margin-left: auto;\n  margin-right: auto;\n  position: relative;\n  transform: translateY(0);\n  transition: -ms-transform 0.2s ease-out 0s, -webkit-transform 0.2s ease-out 0s, transform 0.2s ease-out 0s;\n}\n\n.hide .gallery-figcaption--inner {\n  transform: translateY(70px);\n}\n\n.gallery-figcaption--info {\n  display: table;\n  width: 100%;\n}\n\n.gallery-figcaption--info .caption-left {\n  text-align: left;\n  vertical-align: middle;\n  display: table-cell;\n}\n\n.gallery-figcaption--info .caption-right {\n  text-align: right;\n  vertical-align: middle;\n  display: table-cell;\n}\n\n.gallery-figcaption--info .photo-caption,\n.gallery-figcaption--info .photo-subcaption {\n  margin: 0;\n  line-height: 1.31;\n}\n\n.gallery-figcaption--info .photo-caption {\n  font-weight: 400;\n  font-size: 1rem;\n}\n\n.gallery-figcaption--info .photo-subcaption {\n  color: rgba(255,255,255,0.65);\n  font-size: 0.851rem;\n}\n\n.mode-light .gallery-figcaption--info .photo-subcaption {\n  color: rgba(0,0,0,0.65);\n}\n\n.gallery-figcaption--thumbnails {\n  position: relative;\n  height: 67px;\n  overflow: hidden;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails {\n  position: absolute;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list {\n  position: absolute;\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  left: 0;\n  -webkit-transition: margin 0.3s ease-out 0s;\n  transition: margin 0.3s ease-out 0s;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list::before,\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list::after {\n  content: \"\";\n  display: table;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list::after {\n  clear: both;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li {\n  float: left;\n  background-color: rgb(0, 0, 0);\n}\n\n.mode-light .gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li {\n  background-color: rgb(255, 255, 255);\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li + li {\n  margin-left: 10px;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li button.thumbnail-button {\n  cursor: pointer;\n  position: relative;\n  display: block;\n  vertical-align: bottom;\n  overflow: hidden;\n  background-color: #bbb;\n  background: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li button.thumbnail-button div.loading-spinner {\n  position: absolute;\n  z-index: 1001;\n  width: 2em;\n  height: 2em;\n  top: 50%;\n  left: 50%;\n  margin: -1em 0 0 -1em;\n  border-top-width: 0.15em ;\n  border-right-width: 0.15em;\n  border-bottom-width: 0.15em;\n  border-left-width: 0.15em;\n  -webkit-transform: translate(-50%,-50%);\n  transform: translate(-50%,-50%);\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li button.thumbnail-button.active {\n  cursor: default;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li img.thumbnail {\n  width: 100px;\n  height: 67px;\n  display: block;\n  border-width: 0;\n  position: relative;\n  z-index: 1;\n  opacity: 0.3;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=30)\";\n  filter: alpha(opacity=30);\n  -webkit-backface-visibility: hidden;\n  -moz-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transition: 0.1s ease opacity;\n  transition: 0.1s ease opacity;\n}\n\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li button.thumbnail-button.active img,\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li button.thumbnail-button:hover img {\n  opacity: 1;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  filter: alpha(opacity=100);\n}\n\n.gallery-figcaption .gallery-thumbnails--toggle {\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  vertical-align: bottom;\n  display: inline-block;\n  color: inherit;\n  font-weight: inherit;\n  position: relative;\n}\n\n.gallery-figcaption .gallery-thumbnails--toggle::after {\n  content: \"\";\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 0.181rem;\n}\n\n.gallery-figcaption .gallery-thumbnails--toggle.hide::after {\n  border-top: 6px solid #ffffff;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n}\n\n.mode-light .gallery-figcaption .gallery-thumbnails--toggle.hide::after {\n  border-top-color: #111111;\n}\n\n.gallery-figcaption .gallery-thumbnails--toggle.open::after {\n  border-bottom: 6px solid #ffffff;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n}\n\n.mode-light .gallery-figcaption .gallery-thumbnails--toggle.open::after {\n  border-bottom-color: #111111;\n}\n\n.gallery-modal--close {\n  position: absolute;\n  z-index: 10;\n  right: 0px;\n  top: 0px;\n  padding: 15px;\n}\n\n.gallery-modal--close button.gallery-close {\n  cursor: pointer;\n  background: none transparent;\n  color: 'buttontext';\n  border: 0;\n  display: block;\n  padding: 0.5rem;\n}\n\ndiv.loading-spinner,\ndiv.loading-spinner::after,\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li button.thumbnail-button::before,\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li button.thumbnail-button::after {\n  border-radius: 50%;\n}\n\ndiv.loading-spinner,\ndiv.loading-spinner::after {\n  width: 6em;\n  height: 6em;\n}\n\ndiv.loading-spinner,\n.gallery-figcaption--thumbnails .caption-thumbnails ul.thumbnails-list li button.thumbnail-button::after {\n  font-size: 10px;\n  text-indent: -9999em;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-animation: GalleryLoadingSpinner 1.1s infinite linear;\n  animation: GalleryLoadingSpinner 1.1s infinite linear;\n}\n\ndiv.loading-spinner {\n  margin: 60px auto;\n  position: relative;\n  border-top: 0.35em solid rgba(255, 255, 255, 0.2);\n  border-right: 0.35em solid rgba(255, 255, 255, 0.2);\n  border-bottom: 0.35em solid rgba(255, 255, 255, 0.2);\n  border-left: 0.35em solid #ffffff;\n}\n\n.mode-light div.loading-spinner {\n  border-top-color: rgba(0, 0, 0, 0.1);\n  border-right-color: rgba(0, 0, 0, 0.1);\n  border-bottom-color: rgba(0, 0, 0, 0.1);\n  border-left-color: #111111;\n}\n\n@-webkit-keyframes GalleryLoadingSpinner {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes GalleryLoadingSpinner {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n.gallery ul.gallery-images--ul li.gallery-media-photo.loading::before {\n  z-index: 999;\n  content: \"\";\n  display: block;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0,0,0,1);\n}\n\n.mode-light .gallery ul.gallery-images--ul li.gallery-media-photo.loading::before  {\n  background-color: rgba(255,255,255,1);\n}\n\n.gallery ul.gallery-images--ul li.gallery-media-photo.loading div.loading-spinner,\n.gallery ul.gallery-images--ul li.gallery-media-photo div.picture.loading div.loading-spinner {\n  position: absolute;\n  z-index: 1001;\n  top: 50%;\n  left: 50%;\n  margin: -1rem 0 0 -1rem; /* visually centered */\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n\n/* gallery animation */\n.gallery__animation-appear {\n  opacity: 0.01;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=1)\";\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  transform: translateZ(0);\n}\n\n.gallery__animation-appear-active {\n  opacity: 1;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  -webkit-transition: opacity 150ms ease-out;\n  -o-transition: opacity 150ms ease-out;\n  -moz-transition: opacity 150ms ease-out;\n  transition: opacity 150ms ease-out;\n}\n\n.gallery__image-transition--backwards-enter {\n  opacity: 0.01;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=1)\";\n  -webkit-transform: translateX(-5px);\n  -moz-transform: translateX(-5px);\n  -ms-transform: translateX(-5px);\n  -o-transform: translateX(-5px);\n  transform: translateX(-5px)\n}\n\n.gallery__image-transition--forwards-enter {\n  opacity: 0.01;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=1)\";\n  -webkit-transform: translateX(5px);\n  -moz-transform: translateX(5px);\n  -ms-transform: translateX(5px);\n  -o-transform: translateX(5px);\n  transform: translateX(5px)\n}\n\n.gallery__image-transition--backwards-enter-active,\n.gallery__image-transition--forwards-enter-active {\n  opacity: 1;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  -webkit-transform: translateX(0);\n  -moz-transform: translateX(0);\n  -ms-transform: translateX(0);\n  -o-transform: translateX(0);\n  transform: translateX(0);\n  -webkit-transition: opacity 150ms ease-out, -webkit-transform 150ms ease-out;\n  transition: opacity 150ms ease-out, -webkit-transform 150ms ease-out;\n  -o-transition: opacity 150ms ease-out, -o-transform 150ms ease-out;\n  -moz-transition: opacity 150ms ease-out, transform 150ms ease-out, -moz-transform 150ms ease-out;\n  transition: opacity 150ms ease-out, transform 150ms ease-out;\n  transition: opacity 150ms ease-out, transform 150ms ease-out, -webkit-transform 150ms ease-out, -moz-transform 150ms ease-out, -o-transform 150ms ease-out\n}\n\n.gallery__image-transition--backwards-leave,\n.gallery__image-transition--forwards-leave {\n  opacity: 1;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  transform: translateZ(0)\n}\n\n.gallery__image-transition--backwards-leave-active,\n.gallery__image-transition--forwards-leave-active {\n  opacity: 0.01;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=1)\";\n  -webkit-transition: opacity 150ms ease-out;\n  -o-transition: opacity 150ms ease-out;\n  -moz-transition: opacity 150ms ease-out;\n  transition: opacity 150ms ease-out\n}\n\n@media (max-width: 743px) {\n  .gallery-figcaption--info {\n    padding-bottom: 1rem;\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n\n  .gallery-figcaption .gallery-thumbnails--toggle {\n    display: none;\n  }\n}\n\n@media (min-width: 744px) {\n  .gallery .gallery-photo {\n    padding-bottom: 67%;\n  }\n\n  .gallery-figcaption--info {\n    padding-top: 0.5rem;\n    padding-bottom: 0.5rem;\n  }\n}\n\n@media (min-width: 1128px) {\n  .gallery .gallery-control {\n    width: 75px;\n    font-size: medium;\n  }\n}\n";
styleInject(css);

var propTypes$b = airbnbPropTypes.forbidExtraProps(_objectSpread({}, galleryPropTypes, {
  leftKeyPressed: PropTypes.func,
  onClose: PropTypes.func,
  rightKeyPressed: PropTypes.func,
  show: PropTypes.bool,
  keyboard: PropTypes.bool,
  opacity: opacityValidation,
  backgroundColor: PropTypes.string,
  zIndex: airbnbPropTypes.nonNegativeInteger
}));

var defaultProps$b = _objectSpread({}, galleryDefaultProps, {
  leftKeyPressed: noop,
  onClose: noop,
  rightKeyPressed: noop,
  show: false,
  keyboard: true,
  opacity: DEFAULT_OPACITY,
  backgroundColor: DEFAULT_COLOR,
  zIndex: DEFAULT_Z_INDEX
});

var ReactBnbGallery =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactBnbGallery, _Component);

  function ReactBnbGallery(props) {
    var _this;

    _classCallCheck(this, ReactBnbGallery);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactBnbGallery).call(this, props));
    _this.state = {
      photos: null
    };
    _this.close = _this.close.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ReactBnbGallery, [{
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ESC_KEYCODE:
          event.preventDefault();
          this.close();
          break;

        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.refs.gallery.current.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.refs.gallery.current.next();
          break;

        default:
      }
    }
  }, {
    key: "getModalOverlayStyles",
    value: function getModalOverlayStyles() {
      var _this$props = this.props,
          opacity = _this$props.opacity,
          backgroundColor = _this$props.backgroundColor;
      return {
        opacity: opacity,
        backgroundColor: backgroundColor
      };
    }
  }, {
    key: "close",
    value: function close() {
      var onClose = this.props.onClose;
      onClose();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          show = _this$props2.show,
          phrases = _this$props2.phrases,
          keyboard = _this$props2.keyboard,
          light = _this$props2.light,
          zindex = _this$props2.zIndex;
      var photos = this.state.photos;

      if (!show) {
        return null; // nothing to return
      }

      var galleryProps = omit(this.props, ['onClose', 'leftKeyPressed', 'rightKeyPressed', 'show', 'photos', 'opacity', 'backgroundColor', 'zIndex', 'keyboard']);
      var modalProps = {
        className: classnames(['gallery-modal', light && 'mode-light']),
        role: 'dialog',
        tabIndex: -1,
        onKeyDown: keyboard && this.onKeyDown,
        zindex: zindex
      }; // modal overlay customization styles

      var galleryModalOverlayStyles = this.getModalOverlayStyles();
      return React__default.createElement(reactPortal.Portal, null, React__default.createElement(FocusTrap, null, React__default.createElement("div", modalProps, React__default.createElement("div", {
        style: galleryModalOverlayStyles,
        className: "gallery-modal--overlay"
      }), React__default.createElement("div", {
        className: "gallery-modal--container"
      }, React__default.createElement("div", {
        className: "gallery-modal--table"
      }, React__default.createElement("div", {
        className: "gallery-modal--cell"
      }, React__default.createElement("div", {
        className: "gallery-modal--content"
      }, React__default.createElement("div", {
        className: "gallery-modal--close"
      }, React__default.createElement(GalleryCloseButton, {
        onPress: this.close,
        light: light
      })), React__default.createElement("div", {
        className: "gallery-content"
      }, React__default.createElement("div", {
        className: "gallery-top"
      }, React__default.createElement("div", {
        className: "gallery-top--inner"
      })), React__default.createElement(Gallery, _extends({
        phrases: phrases,
        ref: "gallery",
        photos: photos
      }, galleryProps))))))))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.photos !== state.photos) {
        return {
          photos: getPhotos(props.photos)
        };
      }

      return null;
    }
  }]);

  return ReactBnbGallery;
}(React.Component);

ReactBnbGallery.propTypes = propTypes$b;
ReactBnbGallery.defaultProps = defaultProps$b;

module.exports = ReactBnbGallery;
//# sourceMappingURL=react-bnb-gallery.js.map
