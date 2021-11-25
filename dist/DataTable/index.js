"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

require("./style.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function DataTable(_ref) {
  var id = _ref.id,
      className = _ref.className,
      data = _ref.data,
      columns = _ref.columns;

  var _useState = (0, _react.useState)(10),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      tableLength = _useState2[0],
      setTableLength = _useState2[1];

  var _useState3 = (0, _react.useState)(data),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      dataFilter = _useState4[0],
      setDataFilter = _useState4[1];

  var _useState5 = (0, _react.useState)(1),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      pageIndex = _useState6[0],
      setPageIndex = _useState6[1];

  var nbPage = Math.ceil((dataFilter === null || dataFilter === void 0 ? void 0 : dataFilter.length) / tableLength);
  if (pageIndex > nbPage) setPageIndex(nbPage);
  (0, _react.useEffect)(function () {
    return console.log('test render');
  }, [pageIndex]);

  function handleSelectChange() {
    var len = document.querySelector('#DataTable-length-select').value;
    setTableLength(+len);
    setPageIndex(1);
  }

  function handlePageClick(_ref2) {
    var target = _ref2.target;
    setPageIndex(target.dataset.dtIdx);
  }

  function findTheDot(arrLen, currentPos, tableLen) {
    var MAX_BUTTON = 7;
    var NB_PAGE = Math.ceil(arrLen / tableLen);
    var shouldWeDot = NB_PAGE > MAX_BUTTON;
    var arr = [];

    if (shouldWeDot) {
      var dotAtStart = currentPos > NB_PAGE - 4,
          dotAtEnd = currentPos <= 4;

      if (dotAtEnd) {
        for (var i = 1; i <= MAX_BUTTON - 2; ++i) {
          arr.push(i);
        }

        arr.push('...');
        arr.push(NB_PAGE);
      } else if (dotAtStart) {
        arr.push(1);
        arr.push('...');

        for (var _i = NB_PAGE - 4; _i <= NB_PAGE; ++_i) {
          arr.push(_i);
        }
      } else {
        arr.push(1);
        arr.push('...');
        arr.push(Number(currentPos) - 1);
        arr.push(Number(currentPos));
        arr.push(Number(currentPos) + 1);
        arr.push('...');
        arr.push(NB_PAGE);
      }
    } else {
      for (var _i2 = 1; _i2 <= NB_PAGE; ++_i2) {
        arr.push(_i2);
      }
    }

    return arr;
  }

  function handleChangeSearch() {
    var str = document.querySelector('#search_input').value;
    var tmp = [];
    var regex = new RegExp(str, 'i');
    tmp = data.filter(function (el) {
      var isOk = false;

      for (var column in el) {
        var test = el[column].toString();
        if (test.match(regex)) isOk = true;
      }

      return isOk;
    });
    setDataFilter(tmp);
    setPageIndex(1);
  }

  function handleSortingColumn(_ref3) {
    var target = _ref3.target;
    var tmp = target.className;
    var sortingObject = {
      order: 'none',
      column: 'none'
    };
    document.querySelectorAll('.sorting').forEach(function (el) {
      return el.className = 'sorting';
    });

    if (tmp === 'sorting' || tmp === 'sorting desc') {
      target.className = 'sorting asc';
      sortingObject.order = 'asc';
    } else if (tmp === 'sorting asc') {
      target.className = 'sorting desc';
      sortingObject.order = 'desc';
    }

    sortingObject.column = target.dataset.sortingLabel;
    sorting(sortingObject);
  }

  function sorting(_ref4) {
    var order = _ref4.order,
        column = _ref4.column;
    var tmp = (0, _toConsumableArray2["default"])(dataFilter);
    order === 'asc' ? tmp.sort(function (a, b) {
      if (new Date(a[column]).toString() !== 'Invalid Date') return new Date(a[column]) > new Date(b[column]);else if (typeof a[column] === 'number') return a[column] > b[column];else if (typeof a[column] === 'string') return a[column].toUpperCase() > b[column].toUpperCase();else return -1;
    }) : tmp.sort(function (a, b) {
      if (new Date(a[column]).toString() !== 'Invalid Date') return new Date(a[column]) < new Date(b[column]);else if (typeof a[column] === 'number') return a[column] < b[column];else if (typeof a[column] === 'string') return a[column].toUpperCase() < b[column].toUpperCase();else return -1;
    });
    setDataFilter(tmp);
    setPageIndex(1);
  }

  return /*#__PURE__*/_react["default"].createElement("section", {
    id: "DataTable"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "DataTable-length"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "DataTable-length-select"
  }, "Show", ' ', /*#__PURE__*/_react["default"].createElement("select", {
    name: "DataTable-length-select",
    id: "DataTable-length-select",
    onChange: handleSelectChange
  }, /*#__PURE__*/_react["default"].createElement("option", null, "10"), /*#__PURE__*/_react["default"].createElement("option", null, "20"), /*#__PURE__*/_react["default"].createElement("option", null, "50"), /*#__PURE__*/_react["default"].createElement("option", null, "100")), ' ', "entries"), /*#__PURE__*/_react["default"].createElement("label", null, "Search:", ' ', /*#__PURE__*/_react["default"].createElement("input", {
    id: "search_input",
    type: "search",
    placeholder: "",
    onChange: handleChangeSearch
  }))), /*#__PURE__*/_react["default"].createElement("table", {
    id: id ? id : null,
    className: className ? className : null
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", {
    onClick: handleSortingColumn
  }, columns === null || columns === void 0 ? void 0 : columns.map(function (el, index) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: "".concat(el).concat(index),
      className: "sorting",
      "data-sorting-label": el.data
    }, el.title);
  }))), /*#__PURE__*/_react["default"].createElement("tbody", null, dataFilter === null || dataFilter === void 0 ? void 0 : dataFilter.slice((pageIndex - 1) * tableLength, pageIndex * tableLength).map(function (dataEl, dataIndex) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: "tr-".concat(dataIndex)
    }, columns === null || columns === void 0 ? void 0 : columns.map(function (col, colIndex) {
      return /*#__PURE__*/_react["default"].createElement("td", {
        key: "td-".concat(colIndex)
      }, dataEl[col.data]);
    }));
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "result_div"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Showing ", 1 + (pageIndex - 1) * tableLength, " to", ' ', pageIndex * tableLength, " of ", dataFilter === null || dataFilter === void 0 ? void 0 : dataFilter.length, " entries"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "result_div_span"
  }, "Page n\xB0:", pageIndex, ' ', findTheDot(dataFilter === null || dataFilter === void 0 ? void 0 : dataFilter.length, pageIndex, tableLength).map(function (el, index) {
    return el === '...' ? /*#__PURE__*/_react["default"].createElement("span", {
      key: "link".concat(index)
    }, "...") : /*#__PURE__*/_react["default"].createElement("button", {
      key: "link".concat(index),
      "data-dt-idx": el,
      onClick: handlePageClick
    }, el);
  }))));
}

var _default = DataTable;
exports["default"] = _default;