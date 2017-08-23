'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _project = require('../models/project.js');

var _project2 = _interopRequireDefault(_project);

var _yapi = require('../yapi.js');

var _yapi2 = _interopRequireDefault(_yapi);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _interface = require('../models/interface.js');

var _interface2 = _interopRequireDefault(_interface);

var _interfaceCol = require('../models/interfaceCol.js');

var _interfaceCol2 = _interopRequireDefault(_interfaceCol);

var _interfaceCase = require('../models/interfaceCase.js');

var _interfaceCase2 = _interopRequireDefault(_interfaceCase);

var _interfaceCat = require('../models/interfaceCat.js');

var _interfaceCat2 = _interopRequireDefault(_interfaceCat);

var _group = require('../models/group');

var _group2 = _interopRequireDefault(_group);

var _commons = require('../utils/commons.js');

var _commons2 = _interopRequireDefault(_commons);

var _user = require('../models/user.js');

var _user2 = _interopRequireDefault(_user);

var _log = require('../models/log.js');

var _log2 = _interopRequireDefault(_log);

var _follow = require('../models/follow.js');

var _follow2 = _interopRequireDefault(_follow);

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var send = require('koa-send');

var projectController = function (_baseController) {
    (0, _inherits3.default)(projectController, _baseController);

    function projectController(ctx) {
        (0, _classCallCheck3.default)(this, projectController);

        var _this = (0, _possibleConstructorReturn3.default)(this, (projectController.__proto__ || (0, _getPrototypeOf2.default)(projectController)).call(this, ctx));

        _this.Model = _yapi2.default.getInst(_project2.default);
        _this.groupModel = _yapi2.default.getInst(_group2.default);
        _this.logModel = _yapi2.default.getInst(_log2.default);
        _this.followModel = _yapi2.default.getInst(_follow2.default);
        return _this;
    }

    (0, _createClass3.default)(projectController, [{
        key: 'handleBasepath',
        value: function handleBasepath(basepath) {
            if (!basepath) return "";
            if (basepath === '/') return "";
            if (basepath[0] !== '/') basepath = '/' + basepath;
            if (basepath[basepath.length - 1] === '/') basepath = basepath.substr(0, basepath.length - 1);
            if (!_yapi2.default.commons.verifyPath(basepath)) {
                return false;
            }
            return basepath;
        }
    }, {
        key: 'verifyDomain',
        value: function verifyDomain(domain) {
            if (!domain) return false;
            if (/^[a-zA-Z0-9\-_\.]+?\.[a-zA-Z0-9\-_\.]*?[a-zA-Z]{2,6}$/.test(domain)) {
                return true;
            }
            return false;
        }

        /**
         * 添加项目分组
         * @interface /project/add
         * @method POST
         * @category project
         * @foldnumber 10
         * @param {String} name 项目名称，不能为空
         * @param {String} basepath 项目基本路径，不能为空
         * @param {Number} group_id 项目分组id，不能为空
         * @param {Number} group_name 项目分组名称，不能为空
         * @param {String} project_type private public
         * @param  {String} [desc] 项目描述
         * @returns {Object}
         * @example ./api/project/add.json
         */

    }, {
        key: 'add',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
                var params, checkRepeat, data, result, username;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                params = ctx.request.body;

                                params = _yapi2.default.commons.handleParams(params, {
                                    name: 'string',
                                    basepath: 'string',
                                    group_id: 'number',
                                    group_name: 'string',
                                    desc: 'string',
                                    color: 'string',
                                    icon: 'string'
                                });

                                _context.next = 4;
                                return this.checkAuth(params.group_id, 'group', 'edit');

                            case 4:
                                _context.t0 = _context.sent;

                                if (!(_context.t0 !== true)) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '没有权限'));

                            case 7:
                                if (params.group_id) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目分组id不能为空'));

                            case 9:
                                if (params.name) {
                                    _context.next = 11;
                                    break;
                                }

                                return _context.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目名不能为空'));

                            case 11:
                                _context.next = 13;
                                return this.Model.checkNameRepeat(params.name);

                            case 13:
                                checkRepeat = _context.sent;

                                if (!(checkRepeat > 0)) {
                                    _context.next = 16;
                                    break;
                                }

                                return _context.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 401, '已存在的项目名'));

                            case 16:

                                params.basepath = params.basepath || '';

                                if (!((params.basepath = this.handleBasepath(params.basepath)) === false)) {
                                    _context.next = 19;
                                    break;
                                }

                                return _context.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 401, 'basepath格式有误'));

                            case 19:
                                data = {
                                    name: params.name,
                                    desc: params.desc,
                                    basepath: params.basepath,
                                    members: [],
                                    project_type: params.project_type || 'private',
                                    uid: this.getUid(),
                                    group_id: params.group_id,
                                    group_name: params.group_name,
                                    icon: params.icon,
                                    color: params.color,
                                    add_time: _yapi2.default.commons.time(),
                                    up_time: _yapi2.default.commons.time()
                                };
                                _context.prev = 20;
                                _context.next = 23;
                                return this.Model.save(data);

                            case 23:
                                result = _context.sent;
                                username = this.getUsername();

                                _yapi2.default.commons.saveLog({
                                    content: '\u7528\u6237' + username + '\u6DFB\u52A0\u4E86\u9879\u76EE' + params.name,
                                    type: 'project',
                                    uid: this.getUid(),
                                    username: username,
                                    typeid: params.group_id,
                                    typename: params.group_name,
                                    color: params.color,
                                    icon: params.icon
                                });
                                ctx.body = _yapi2.default.commons.resReturn(result);
                                _context.next = 32;
                                break;

                            case 29:
                                _context.prev = 29;
                                _context.t1 = _context['catch'](20);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context.t1.message);

                            case 32:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[20, 29]]);
            }));

            function add(_x) {
                return _ref.apply(this, arguments);
            }

            return add;
        }()
        /**
        * 添加项目成员
        * @interface /project/add_member
        * @method POST
        * @category project
        * @foldnumber 10
        * @param {Number} id 项目id，不能为空
        * @param {String} member_uid 项目成员uid,不能为空
        * @returns {Object}
        * @example ./api/project/add_member.json
        */

    }, {
        key: 'addMember',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx) {
                var params, check, userdata, result, username, project;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                params = ctx.request.body;

                                if (params.member_uid) {
                                    _context2.next = 3;
                                    break;
                                }

                                return _context2.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目成员uid不能为空'));

                            case 3:
                                if (params.id) {
                                    _context2.next = 5;
                                    break;
                                }

                                return _context2.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目id不能为空'));

                            case 5:
                                _context2.next = 7;
                                return this.checkAuth(params.id, 'project', 'edit');

                            case 7:
                                _context2.t0 = _context2.sent;

                                if (!(_context2.t0 !== true)) {
                                    _context2.next = 10;
                                    break;
                                }

                                return _context2.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '没有权限'));

                            case 10:
                                _context2.next = 12;
                                return this.Model.checkMemberRepeat(params.id, params.member_uid);

                            case 12:
                                check = _context2.sent;

                                if (!(check > 0)) {
                                    _context2.next = 15;
                                    break;
                                }

                                return _context2.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目成员已存在'));

                            case 15:

                                params.role = params.role === 'owner' ? 'owner' : 'dev';

                                _context2.next = 18;
                                return this.getUserdata(params.member_uid, params.role);

                            case 18:
                                userdata = _context2.sent;

                                if (!(userdata === null)) {
                                    _context2.next = 21;
                                    break;
                                }

                                return _context2.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '成员uid不存在'));

                            case 21:
                                _context2.prev = 21;
                                _context2.next = 24;
                                return this.Model.addMember(params.id, userdata);

                            case 24:
                                result = _context2.sent;
                                username = this.getUsername();
                                _context2.next = 28;
                                return this.Model.get(params.id);

                            case 28:
                                project = _context2.sent;

                                _yapi2.default.commons.saveLog({
                                    content: '\u7528\u6237' + username + '\u6DFB\u52A0\u4E86\u9879\u76EE\u6210\u5458' + userdata.username,
                                    type: 'project',
                                    uid: this.getUid(),
                                    username: username,
                                    typeid: params.id,
                                    color: project.color,
                                    icon: project.icon
                                });
                                ctx.body = _yapi2.default.commons.resReturn(result);
                                _context2.next = 36;
                                break;

                            case 33:
                                _context2.prev = 33;
                                _context2.t1 = _context2['catch'](21);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context2.t1.message);

                            case 36:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[21, 33]]);
            }));

            function addMember(_x2) {
                return _ref2.apply(this, arguments);
            }

            return addMember;
        }()
        /**
        * 删除项目成员
        * @interface /project/del_member
        * @method POST
        * @category project
        * @foldnumber 10
        * @param {Number} id 项目id，不能为空
        * @param {member_uid} uid 项目成员uid,不能为空
        * @returns {Object}
        * @example ./api/project/del_member.json
        */

    }, {
        key: 'delMember',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx) {
                var params, check, result, username, project, member;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                params = ctx.request.body;

                                if (params.member_uid) {
                                    _context3.next = 3;
                                    break;
                                }

                                return _context3.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目成员uid不能为空'));

                            case 3:
                                if (params.id) {
                                    _context3.next = 5;
                                    break;
                                }

                                return _context3.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目id不能为空'));

                            case 5:
                                _context3.next = 7;
                                return this.Model.checkMemberRepeat(params.id, params.member_uid);

                            case 7:
                                check = _context3.sent;

                                if (!(check === 0)) {
                                    _context3.next = 10;
                                    break;
                                }

                                return _context3.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目成员不存在'));

                            case 10:
                                _context3.next = 12;
                                return this.checkAuth(params.id, 'project', 'danger');

                            case 12:
                                _context3.t0 = _context3.sent;

                                if (!(_context3.t0 !== true)) {
                                    _context3.next = 15;
                                    break;
                                }

                                return _context3.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '没有权限'));

                            case 15:
                                _context3.prev = 15;
                                _context3.next = 18;
                                return this.Model.delMember(params.id, params.member_uid);

                            case 18:
                                result = _context3.sent;
                                username = this.getUsername();
                                _context3.next = 22;
                                return this.Model.get(params.id);

                            case 22:
                                project = _context3.sent;
                                _context3.next = 25;
                                return _yapi2.default.getInst(_user2.default).findById(params.member_uid);

                            case 25:
                                member = _context3.sent;

                                _yapi2.default.commons.saveLog({
                                    content: '\u7528\u6237' + username + '\u5220\u9664\u4E86\u9879\u76EE' + project.name + '\u4E2D\u7684\u6210\u5458' + member.username,
                                    type: 'project',
                                    uid: this.getUid(),
                                    username: username,
                                    typeid: params.id,
                                    color: project.color,
                                    icon: project.icon
                                });
                                ctx.body = _yapi2.default.commons.resReturn(result);
                                _context3.next = 33;
                                break;

                            case 30:
                                _context3.prev = 30;
                                _context3.t1 = _context3['catch'](15);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context3.t1.message);

                            case 33:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[15, 30]]);
            }));

            function delMember(_x3) {
                return _ref3.apply(this, arguments);
            }

            return delMember;
        }()
    }, {
        key: 'getUserdata',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(uid, role) {
                var userInst, userData;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                role = role || 'dev';
                                userInst = _yapi2.default.getInst(_user2.default);
                                _context4.next = 4;
                                return userInst.findById(uid);

                            case 4:
                                userData = _context4.sent;

                                if (userData) {
                                    _context4.next = 7;
                                    break;
                                }

                                return _context4.abrupt('return', null);

                            case 7:
                                return _context4.abrupt('return', {
                                    role: role,
                                    uid: userData._id,
                                    username: userData.username,
                                    email: userData.email
                                });

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getUserdata(_x4, _x5) {
                return _ref4.apply(this, arguments);
            }

            return getUserdata;
        }()

        /**
         * 获取项目成员列表
         * @interface /project/get_member_list
         * @method GET
         * @category project
         * @foldnumber 10
         * @param {Number} id 项目id，不能为空
         * @return {Object}
         * @example ./api/project/get_member_list.json
         */

    }, {
        key: 'getMemberList',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx) {
                var params, project;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                params = ctx.request.query;

                                if (params.id) {
                                    _context5.next = 3;
                                    break;
                                }

                                return _context5.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目id不能为空'));

                            case 3:
                                _context5.prev = 3;
                                _context5.next = 6;
                                return this.Model.get(params.id);

                            case 6:
                                project = _context5.sent;

                                ctx.body = _yapi2.default.commons.resReturn(project.members);
                                _context5.next = 13;
                                break;

                            case 10:
                                _context5.prev = 10;
                                _context5.t0 = _context5['catch'](3);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context5.t0.message);

                            case 13:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[3, 10]]);
            }));

            function getMemberList(_x6) {
                return _ref5.apply(this, arguments);
            }

            return getMemberList;
        }()

        /**
        * 获取项目信息
        * @interface /project/get
        * @method GET
        * @category project
        * @foldnumber 10
        * @param {Number} id 项目id，不能为空
        * @returns {Object}
        * @example ./api/project/get.json
        */

    }, {
        key: 'get',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx) {
                var params, result, catInst, cat;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                params = ctx.request.query;

                                if (params.id) {
                                    _context6.next = 3;
                                    break;
                                }

                                return _context6.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目id不能为空'));

                            case 3:
                                _context6.prev = 3;
                                _context6.next = 6;
                                return this.Model.getBaseInfo(params.id);

                            case 6:
                                result = _context6.sent;

                                if (result) {
                                    _context6.next = 9;
                                    break;
                                }

                                return _context6.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '不存在的项目'));

                            case 9:
                                result = result.toObject();
                                catInst = _yapi2.default.getInst(_interfaceCat2.default);
                                _context6.next = 13;
                                return catInst.list(params.id);

                            case 13:
                                cat = _context6.sent;

                                result.cat = cat;
                                _context6.next = 17;
                                return this.getProjectRole(params.id, 'project');

                            case 17:
                                result.role = _context6.sent;

                                ctx.body = _yapi2.default.commons.resReturn(result);
                                _context6.next = 24;
                                break;

                            case 21:
                                _context6.prev = 21;
                                _context6.t0 = _context6['catch'](3);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context6.t0.message);

                            case 24:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[3, 21]]);
            }));

            function get(_x7) {
                return _ref6.apply(this, arguments);
            }

            return get;
        }()

        /**
         * 获取项目列表
         * @interface /project/list
         * @method GET
         * @category project
         * @foldnumber 10
         * @param {Number} group_id 项目group_id，不能为空
         * @returns {Object}
         * @example ./api/project/list.json
         */

    }, {
        key: 'list',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx) {
                var group_id, auth, result, uids, _users, users;

                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                group_id = ctx.request.query.group_id;

                                if (group_id) {
                                    _context7.next = 3;
                                    break;
                                }

                                return _context7.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目分组id不能为空'));

                            case 3:
                                _context7.next = 5;
                                return this.checkAuth(group_id, 'group', 'edit');

                            case 5:
                                auth = _context7.sent;
                                _context7.prev = 6;
                                _context7.next = 9;
                                return this.Model.list(group_id, auth);

                            case 9:
                                result = _context7.sent;
                                uids = [];

                                result.forEach(function (item) {
                                    if (uids.indexOf(item.uid) === -1) {
                                        uids.push(item.uid);
                                    }
                                });
                                _users = {};
                                _context7.next = 15;
                                return _yapi2.default.getInst(_user2.default).findByUids(uids);

                            case 15:
                                users = _context7.sent;

                                users.forEach(function (item) {
                                    _users[item._id] = item;
                                });
                                ctx.body = _yapi2.default.commons.resReturn({
                                    list: result
                                });
                                _context7.next = 23;
                                break;

                            case 20:
                                _context7.prev = 20;
                                _context7.t0 = _context7['catch'](6);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context7.t0.message);

                            case 23:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[6, 20]]);
            }));

            function list(_x8) {
                return _ref7.apply(this, arguments);
            }

            return list;
        }()

        /**
         * 删除项目
         * @interface /project/del
         * @method POST
         * @category project
         * @foldnumber 10
         * @param {Number} id 项目id，不能为空
         * @returns {Object}
         * @example ./api/project/del.json
         */

    }, {
        key: 'del',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx) {
                var id, interfaceInst, interfaceColInst, interfaceCaseInst, result;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.prev = 0;
                                id = ctx.request.body.id;

                                if (id) {
                                    _context8.next = 4;
                                    break;
                                }

                                return _context8.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目id不能为空'));

                            case 4:
                                _context8.next = 6;
                                return this.checkAuth(id, 'project', 'danger');

                            case 6:
                                _context8.t0 = _context8.sent;

                                if (!(_context8.t0 !== true)) {
                                    _context8.next = 9;
                                    break;
                                }

                                return _context8.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '没有权限'));

                            case 9:
                                interfaceInst = _yapi2.default.getInst(_interface2.default);
                                interfaceColInst = _yapi2.default.getInst(_interfaceCol2.default);
                                interfaceCaseInst = _yapi2.default.getInst(_interfaceCase2.default);
                                _context8.next = 14;
                                return interfaceInst.delByProjectId(id);

                            case 14:
                                _context8.next = 16;
                                return interfaceCaseInst.delByProjectId(id);

                            case 16:
                                _context8.next = 18;
                                return interfaceColInst.delByProjectId(id);

                            case 18:
                                _context8.next = 20;
                                return this.Model.del(id);

                            case 20:
                                result = _context8.sent;

                                ctx.body = _yapi2.default.commons.resReturn(result);
                                _context8.next = 27;
                                break;

                            case 24:
                                _context8.prev = 24;
                                _context8.t1 = _context8['catch'](0);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context8.t1.message);

                            case 27:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[0, 24]]);
            }));

            function del(_x9) {
                return _ref8.apply(this, arguments);
            }

            return del;
        }()

        /**
         * 修改项目成员角色
         * @interface /project/change_member_role
         * @method POST
         * @category project
         * @foldnumber 10
         * @param {String} id 项目id
         * @param {String} member_uid 项目成员uid
         * @param {String} role 权限 ['owner'|'dev']
         * @returns {Object}
         * @example
         */

    }, {
        key: 'changeMemberRole',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(ctx) {
                var params, projectInst, check, result, username, project, member;
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                params = ctx.request.body;
                                projectInst = _yapi2.default.getInst(_project2.default);

                                if (params.member_uid) {
                                    _context9.next = 4;
                                    break;
                                }

                                return _context9.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目成员uid不能为空'));

                            case 4:
                                if (params.id) {
                                    _context9.next = 6;
                                    break;
                                }

                                return _context9.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目id不能为空'));

                            case 6:
                                _context9.next = 8;
                                return projectInst.checkMemberRepeat(params.id, params.member_uid);

                            case 8:
                                check = _context9.sent;

                                if (!(check === 0)) {
                                    _context9.next = 11;
                                    break;
                                }

                                return _context9.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 400, '项目成员不存在'));

                            case 11:
                                _context9.next = 13;
                                return this.checkAuth(params.id, 'group', 'danger');

                            case 13:
                                _context9.t0 = _context9.sent;

                                if (!(_context9.t0 !== true)) {
                                    _context9.next = 16;
                                    break;
                                }

                                return _context9.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '没有权限'));

                            case 16:

                                params.role = params.role === 'owner' ? 'owner' : 'dev';

                                _context9.prev = 17;
                                _context9.next = 20;
                                return projectInst.changeMemberRole(params.id, params.member_uid, params.role);

                            case 20:
                                result = _context9.sent;
                                username = this.getUsername();
                                _context9.next = 24;
                                return this.Model.get(params.id);

                            case 24:
                                project = _context9.sent;
                                _context9.next = 27;
                                return _yapi2.default.getInst(_user2.default).findById(params.member_uid);

                            case 27:
                                member = _context9.sent;

                                _yapi2.default.commons.saveLog({
                                    content: '\u7528\u6237' + username + '\u4FEE\u6539\u4E86\u9879\u76EE' + project.name + '\u4E2D\u6210\u5458' + member.username + '\u7684\u89D2\u8272\u4E3A' + params.role,
                                    type: 'project',
                                    uid: this.getUid(),
                                    username: username,
                                    typeid: params.id
                                });
                                ctx.body = _yapi2.default.commons.resReturn(result);
                                _context9.next = 35;
                                break;

                            case 32:
                                _context9.prev = 32;
                                _context9.t1 = _context9['catch'](17);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context9.t1.message);

                            case 35:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[17, 32]]);
            }));

            function changeMemberRole(_x10) {
                return _ref9.apply(this, arguments);
            }

            return changeMemberRole;
        }()

        /**
         * 项目设置
         * @interface /project/upset
         * @method POST
         * @category project
         * @foldnumber 10
         * @param {Number} id 项目id，不能为空
         * @param {String} icon 项目icon
         * @param {Array} color 项目color
         * @returns {Object}
         * @example ./api/project/upset
         */

    }, {
        key: 'upSet',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(ctx) {
                var id, data, result;
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                id = ctx.request.body.id;
                                data = {};

                                data.color = ctx.request.body.color;
                                data.icon = ctx.request.body.icon;

                                if (id) {
                                    _context10.next = 6;
                                    break;
                                }

                                return _context10.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '项目id不能为空'));

                            case 6:
                                _context10.prev = 6;
                                _context10.next = 9;
                                return this.Model.up(id, data);

                            case 9:
                                result = _context10.sent;

                                ctx.body = _yapi2.default.commons.resReturn(result);
                                _context10.next = 16;
                                break;

                            case 13:
                                _context10.prev = 13;
                                _context10.t0 = _context10['catch'](6);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context10.t0.message);

                            case 16:
                                try {
                                    this.followModel.updateById(this.getUid(), id, data).then();
                                } catch (e) {
                                    _yapi2.default.commons.log(e, 'error'); // eslint-disable-line
                                }

                            case 17:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this, [[6, 13]]);
            }));

            function upSet(_x11) {
                return _ref10.apply(this, arguments);
            }

            return upSet;
        }()

        /**
         * 编辑项目
         * @interface /project/up
         * @method POST
         * @category project
         * @foldnumber 10
         * @param {Number} id 项目id，不能为空
         * @param {String} name 项目名称，不能为空
         * @param {String} basepath 项目基本路径，不能为空
         * @param {String} [desc] 项目描述
         * @param {Array} [env] 项目环境配置
         * @param {String} [env[].name] 环境名称
         * @param {String} [env[].domain] 环境域名
         * @returns {Object}
         * @example ./api/project/up.json
         */

    }, {
        key: 'up',
        value: function () {
            var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(ctx) {
                var id, params, projectData, checkRepeat, data, result, username;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.prev = 0;
                                id = ctx.request.body.id;
                                params = ctx.request.body;

                                params.basepath = params.basepath || '';
                                params = _yapi2.default.commons.handleParams(params, {
                                    name: 'string',
                                    basepath: 'string',
                                    group_id: 'number',
                                    desc: 'string',
                                    icon: 'string',
                                    color: 'string'
                                });

                                if (id) {
                                    _context11.next = 7;
                                    break;
                                }

                                return _context11.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '项目id不能为空'));

                            case 7:
                                _context11.next = 9;
                                return this.checkAuth(id, 'project', 'edit');

                            case 9:
                                _context11.t0 = _context11.sent;

                                if (!(_context11.t0 !== true)) {
                                    _context11.next = 12;
                                    break;
                                }

                                return _context11.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '没有权限'));

                            case 12:
                                _context11.next = 14;
                                return this.Model.get(id);

                            case 14:
                                projectData = _context11.sent;

                                if (!((params.basepath = this.handleBasepath(params.basepath)) === false)) {
                                    _context11.next = 17;
                                    break;
                                }

                                return _context11.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 401, 'basepath格式有误'));

                            case 17:

                                if (projectData.name === params.name) {
                                    delete params.name;
                                }

                                if (!params.name) {
                                    _context11.next = 24;
                                    break;
                                }

                                _context11.next = 21;
                                return this.Model.checkNameRepeat(params.name);

                            case 21:
                                checkRepeat = _context11.sent;

                                if (!(checkRepeat > 0)) {
                                    _context11.next = 24;
                                    break;
                                }

                                return _context11.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 401, '已存在的项目名'));

                            case 24:
                                data = {
                                    up_time: _yapi2.default.commons.time()
                                };


                                if (params.name) data.name = params.name;
                                if (params.desc) data.desc = params.desc;
                                if (params.basepath) {
                                    data.basepath = params.basepath;
                                }
                                if (params.env) data.env = params.env;
                                if (params.color) data.color = params.color;
                                if (params.icon) data.icon = params.icon;
                                _context11.next = 33;
                                return this.Model.up(id, data);

                            case 33:
                                result = _context11.sent;
                                username = this.getUsername();

                                _yapi2.default.commons.saveLog({
                                    content: '\u7528\u6237' + username + '\u66F4\u65B0\u4E86\u9879\u76EE' + projectData.name,
                                    type: 'project',
                                    uid: this.getUid(),
                                    username: username,
                                    typeid: id
                                });
                                ctx.body = _yapi2.default.commons.resReturn(result);
                                _context11.next = 42;
                                break;

                            case 39:
                                _context11.prev = 39;
                                _context11.t1 = _context11['catch'](0);

                                ctx.body = _yapi2.default.commons.resReturn(null, 402, _context11.t1.message);

                            case 42:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this, [[0, 39]]);
            }));

            function up(_x12) {
                return _ref11.apply(this, arguments);
            }

            return up;
        }()

        /**
         * 模糊搜索项目名称或者组名称
         * @interface /project/search
         * @method GET
         * @category project
         * @foldnumber 10
         * @param {String} q
         * @return {Object}
         * @example ./api/project/search.json
        */

    }, {
        key: 'search',
        value: function () {
            var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(ctx) {
                var q, projectList, groupList, projectRules, groupRules, queryList;
                return _regenerator2.default.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                q = ctx.request.query.q;

                                if (q) {
                                    _context12.next = 3;
                                    break;
                                }

                                return _context12.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(void 0, 400, 'No keyword.'));

                            case 3:
                                if (_yapi2.default.commons.validateSearchKeyword(q)) {
                                    _context12.next = 5;
                                    break;
                                }

                                return _context12.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(void 0, 400, 'Bad query.'));

                            case 5:
                                _context12.next = 7;
                                return this.Model.search(q);

                            case 7:
                                projectList = _context12.sent;
                                _context12.next = 10;
                                return this.groupModel.search(q);

                            case 10:
                                groupList = _context12.sent;
                                projectRules = ['_id', 'name', 'basepath', 'uid', 'env', 'members', { key: 'group_id', alias: 'groupId' }, { key: 'up_time', alias: 'upTime' }, { key: 'add_time', alias: 'addTime' }];
                                groupRules = ['_id', 'uid', { key: 'group_name', alias: 'groupName' }, { key: 'group_desc', alias: 'groupDesc' }, { key: 'add_time', alias: 'addTime' }, { key: 'up_time', alias: 'upTime' }];


                                projectList = _commons2.default.filterRes(projectList, projectRules);
                                groupList = _commons2.default.filterRes(groupList, groupRules);

                                queryList = {
                                    project: projectList,
                                    group: groupList
                                };
                                return _context12.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(queryList, 0, 'ok'));

                            case 17:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function search(_x13) {
                return _ref12.apply(this, arguments);
            }

            return search;
        }()

        /**
         * 下载项目的 Mock 数据
         * @interface /project/download
         * @method GET
         * @category project
         * @foldnumber 10
         * @author wenbo.dong
         * @param {String} project_id
        */

    }, {
        key: 'download',
        value: function () {
            var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(ctx) {
                var project_id, interfaceInst, count, arr, fileName, res;
                return _regenerator2.default.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                project_id = ctx.request.query.project_id;
                                interfaceInst = _yapi2.default.getInst(_interface2.default);
                                // 根据 project_id 获取接口数据

                                _context13.next = 4;
                                return interfaceInst.list(project_id);

                            case 4:
                                count = _context13.sent;

                                if (project_id) {
                                    _context13.next = 9;
                                    break;
                                }

                                return _context13.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 405, '项目id不能为空'));

                            case 9:
                                if (count) {
                                    _context13.next = 11;
                                    break;
                                }

                                return _context13.abrupt('return', ctx.body = _yapi2.default.commons.resReturn(null, 401, '项目id不存在'));

                            case 11:
                                arr = (0, _stringify2.default)(count.map(function (item) {
                                    // 返回的json模板数据: item.res_body
                                    var mockData = _mockjs2.default.mock(_yapi2.default.commons.json_parse(item.res_body));
                                    return {
                                        path: item.path,
                                        mock: mockData
                                    };
                                }));
                                fileName = 'mock.js';

                                ctx.attachment(fileName);
                                _context13.next = 16;
                                return send(ctx, fileName, { root: __dirname + '/public' });

                            case 16:
                                res = ('\n        var Mock = require(\'mockjs\');\n        var xhook = require(\'xhook\');\n        var data = ' + arr + ';\n        function run() {\n            xhook.before(function(request, callback) {\n                setTimeout(function() {\n                    var res;\n                    data.forEach((item) => {\n                        // \u8BF7\u6C42\u7684\u63A5\u53E3\u5728 data \u4E2D\u5B58\u5728\n                         if(request.url === item.path) {\n                            res = {\n                                status: 200,\n                                text: Mock.mock(item.mock)\n                            }\n                        }\n                    });\n                    if (res) {\n                        callback(res);\n                    }else {\n                        callback({ status: 405, text: \'\u63A5\u53E3\u4E0D\u5B58\u5728\' });\n                    }\n              }, 500);\n            });\n        }\n        module.exports = run;').trim();
                                return _context13.abrupt('return', ctx.body = res);

                            case 18:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function download(_x14) {
                return _ref13.apply(this, arguments);
            }

            return download;
        }()
    }]);
    return projectController;
}(_base2.default);

module.exports = projectController;