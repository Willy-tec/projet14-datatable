"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _MainTable = _interopRequireDefault(require("../component/MainTable"));

var _PaginationNavigation = _interopRequireDefault(require("../component/PaginationNavigation"));

var _SearchInput = _interopRequireDefault(require("../component/SearchInput"));

var _SelectPagination = _interopRequireDefault(require("../component/SelectPagination"));

require("./style.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function DataTable(_ref) {
  var id = _ref.id,
      className = _ref.className,
      data = _ref.data,
      columns = _ref.columns;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      filterText = _useState2[0],
      setFilterText = _useState2[1];

  var _useState3 = (0, _react.useState)(10),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      tableLength = _useState4[0],
      setTableLength = _useState4[1];

  var _useState5 = (0, _react.useState)(1),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      pageIndex = _useState6[0],
      setPageIndex = _useState6[1];

  var _useState7 = (0, _react.useState)({
    order: null,
    column: null
  }),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      sortingObject = _useState8[0],
      setSortingObject = _useState8[1];

  var nbPage = Math.ceil((data === null || data === void 0 ? void 0 : data.length) / tableLength);
  if (pageIndex > nbPage) setPageIndex(nbPage);
  var dataArray = filterData();

  function filterData() {
    var regex = new RegExp(filterText, 'i');
    return data.filter(function (el) {
      for (var column in el) {
        var test = el[column].toString();
        if (test.match(regex)) return true;
      }

      return false;
    });
  }

  if (sortingObject.order && sortingObject.column) sorting(sortingObject);

  function sorting(_ref2) {
    var order = _ref2.order,
        column = _ref2.column;

    var asc = function asc(a, b) {
      return a > b ? 1 : -1;
    };

    var desc = function desc(a, b) {
      return a < b ? 1 : -1;
    };

    if (dataArray.length == 0) return;
    var isNumber = isNaN(Number(dataArray[0][column])) ? false : true;
    var isDate = !!(!isNumber && dataArray[0][column].match(/[0-9]+\/[0-9]+\/[0-9]+/g));

    var dateCompare = function dateCompare(a, b) {
      var aArr = a.split('/');
      var bArr = b.split('/');
      if (aArr[2] > bArr[2]) return 1;else if (aArr[2] < bArr[2]) return -1;else if (aArr[1] > bArr[1]) return 1;else if (aArr[1] < bArr[1]) return -1;else if (aArr[0] > bArr[0]) return 1;else if (aArr[0] < bArr[0]) return -1;
    };

    var dateCompareDesc = function dateCompareDesc(a, b) {
      var aArr = a.split('/');
      var bArr = b.split('/');
      if (aArr[2] < bArr[2]) return 1;else if (aArr[2] > bArr[2]) return -1;else if (aArr[1] < bArr[1]) return 1;else if (aArr[1] > bArr[1]) return -1;else if (aArr[0] < bArr[0]) return 1;else if (aArr[0] > bArr[0]) return -1;
    };

    var fnCompare = order === 'asc' ? asc : desc;
    dataArray.sort(function (a, b) {
      if (isDate) return order == 'asc' ? dateCompare(a[column], b[column]) : dateCompareDesc(a[column], b[column]);else if (isNumber) return fnCompare(Number(a[column]), Number(b[column]));else return fnCompare(a[column], b[column]);
    });
  }

  return /*#__PURE__*/_react.default.createElement("section", {
    id: "DataTable"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "DataTable-length"
  }, /*#__PURE__*/_react.default.createElement(_SelectPagination.default, {
    setTableLength: setTableLength
  }), /*#__PURE__*/_react.default.createElement(_SearchInput.default, {
    filterText: filterText,
    setFilterText: setFilterText
  })), /*#__PURE__*/_react.default.createElement(_MainTable.default, {
    title: "okTitle",
    data: dataArray,
    columns: columns,
    currentPage: pageIndex,
    tableLength: tableLength,
    setSortingObject: setSortingObject
  }), /*#__PURE__*/_react.default.createElement(_PaginationNavigation.default, {
    pageIndex: pageIndex,
    setPageIndex: setPageIndex,
    tableLength: tableLength,
    dataLength: dataArray.length
  }));
}

var _default = DataTable; // TODO Découpage en plusieurs composants
// TODO Remettre en place les states et props comme il faut

exports.default = _default;