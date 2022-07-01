"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DashboardTab = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var algorand_1 = require("utils/algorand");
var components_1 = require("components");
var sockholder_svg_1 = require("assets/icons/sockholder.svg");
// import { ReactComponent as VerifiedIcon } from 'assets/icons/verified.svg'
var arrow_right_svg_1 = require("assets/icons/arrow-right.svg");
var verified_png_1 = require("assets/icons/verified.png");
require("react-responsive-carousel/lib/styles/carousel.min.css"); // requires a loader
var react_responsive_carousel_1 = require("react-responsive-carousel");
var sample_nft_png_1 = require("assets/images/sample-nft.png");
var DashboardTab_module_scss_1 = require("./DashboardTab.module.scss");
var wallet_slice_1 = require("redux/wallet/wallet-slice");
var classnames_1 = require("classnames");
var WalletService_1 = require("services/WalletService");
var usdTabDetails = [
    {
        name: "LIQUIDITY",
        value: "$20,605.93"
    },
    {
        name: "MARKET CAP",
        value: "$220,336"
    },
    {
        name: "FDMC",
        value: "$475,416"
    },
    {
        name: "CIRC. SUPPLY",
        value: "46.34%"
    },
    {
        name: "TOTAL SUPPLY",
        value: "100,000,000"
    },
];
exports.DashboardTab = function (_a) {
    var tabFor = _a["for"];
    var dispatch = react_redux_1.useDispatch();
    var _b = react_redux_1.useSelector(function (state) { return state.wallets; }), connected = _b.connected, selectedAccount = _b.selectedAccount, userInfo = _b.userInfo;
    var _c = react_1.useState({
        loading: false,
        txId: "",
        amount: undefined,
        success: false
    }), scanRewardsInfo = _c[0], setScanRewardsInfo = _c[1];
    var _d = react_1.useState(false), isOptinModal = _d[0], setIsOptinModal = _d[1];
    var _e = react_1.useState(false), disableBtn = _e[0], setDisableBtn = _e[1];
    var _f = react_1.useState(), availableHour = _f[0], setAvailableHour = _f[1];
    react_1.useEffect(function () {
        var lastLoginFunc = function (username) { return __awaiter(void 0, void 0, void 0, function () {
            var lastLogin, currentTime, diffTime, availableHour_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, WalletService_1.WalletService.getLastLoginDailyScanRewards(username)];
                    case 1:
                        lastLogin = _a.sent();
                        if (lastLogin) {
                            currentTime = new Date();
                            diffTime = currentTime.getTime() - new Date(lastLogin).getTime();
                            if (diffTime < 1000 * 60 * 60 * 24) {
                                setDisableBtn(true);
                                availableHour_1 = 24 - Math.ceil(diffTime / 1000 / 60 / 60);
                                setAvailableHour(availableHour_1);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        if (userInfo.username) {
            lastLoginFunc(userInfo.username);
        }
    }, [userInfo, scanRewardsInfo.success]);
    var handleClaimDailyRewards = function () { return __awaiter(void 0, void 0, void 0, function () {
        var randomAmount, lastLogin, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(connected && selectedAccount)) return [3 /*break*/, 6];
                    randomAmount = Math.floor(Math.random() * 200);
                    setScanRewardsInfo(__assign(__assign({}, scanRewardsInfo), { loading: true, amount: randomAmount }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, algorand_1.sendRewardSOCKSToken(selectedAccount, randomAmount, setScanRewardsInfo)];
                case 2:
                    _a.sent();
                    lastLogin = new Date();
                    return [4 /*yield*/, WalletService_1.WalletService.setLastLoginDailyScanRewards({
                            username: userInfo.username || "",
                            date: lastLogin.toString()
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    if (error_1.message.includes("must optin")) {
                        setIsOptinModal(true);
                    }
                    setScanRewardsInfo({
                        loading: false,
                        txId: "",
                        amount: randomAmount,
                        success: false
                    });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    dispatch(wallet_slice_1.setModalStep(1));
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(components_1.LayoutTab, { "for": tabFor },
        react_1["default"].createElement("section", { className: DashboardTab_module_scss_1["default"].content },
            react_1["default"].createElement("h2", { className: DashboardTab_module_scss_1["default"].title }, "Welcome back"),
            react_1["default"].createElement(components_1.Button, { onClick: handleClaimDailyRewards, disabled: scanRewardsInfo.loading || disableBtn, className: classnames_1["default"](DashboardTab_module_scss_1["default"].daily__action, disableBtn && DashboardTab_module_scss_1["default"].daily__disable), tooltip: disableBtn ? "You can claim in " + availableHour + " hours." : "" }, scanRewardsInfo.loading ? (react_1["default"].createElement(components_1.LoadingIndicator, null)) : ("CLAIM DAILY SCAN REWARDS")),
            react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].nft },
                react_1["default"].createElement("img", { src: "https://unsplash.it/600/600", alt: "", className: DashboardTab_module_scss_1["default"].nft__img }),
                react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].nft__info },
                    react_1["default"].createElement("span", { className: DashboardTab_module_scss_1["default"].nft__title }, "Featured NFT"),
                    react_1["default"].createElement("span", { className: DashboardTab_module_scss_1["default"].nft__subtitle }, "Algopard #488"),
                    react_1["default"].createElement("p", { className: DashboardTab_module_scss_1["default"].nft__details }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum tortor ac auctor sollicitudin."),
                    react_1["default"].createElement(components_1.Button, { size: "huge" }, "BID ON ALGOXNFT"))),
            react_1["default"].createElement("section", { className: DashboardTab_module_scss_1["default"].grid },
                react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].grid__left },
                    react_1["default"].createElement(components_1.Card, { className: DashboardTab_module_scss_1["default"].release, style: { backgroundImage: "url(" + sample_nft_png_1["default"] + ")" } },
                        react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].release__content },
                            react_1["default"].createElement("h2", null, "SOCKBOT"),
                            react_1["default"].createElement("span", null,
                                "New Collection Releasing 07/22",
                                react_1["default"].createElement("br", null),
                                react_1["default"].createElement("br", null),
                                "Reserve your SOCKBOT today."),
                            react_1["default"].createElement("button", null, "learn more"))),
                    react_1["default"].createElement(components_1.Card, { className: DashboardTab_module_scss_1["default"].price },
                        react_1["default"].createElement("span", { className: DashboardTab_module_scss_1["default"].price__title }, "Price Ticker"),
                        react_1["default"].createElement(components_1.Tabs, { tabs: [
                                {
                                    label: "ALGO",
                                    value: "algo"
                                },
                                {
                                    label: "USD",
                                    value: "usd"
                                },
                            ], className: DashboardTab_module_scss_1["default"].price__tabs, selected: "usd" },
                            react_1["default"].createElement(components_1.Tab, { "for": "algo" }, "algo"),
                            react_1["default"].createElement(components_1.Tab, { "for": "usd" },
                                react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].price__sockholder },
                                    react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"]["price__sockholder-grid"] },
                                        react_1["default"].createElement(sockholder_svg_1.ReactComponent, null),
                                        react_1["default"].createElement("span", null,
                                            "SOCKHODLER ",
                                            react_1["default"].createElement("img", { src: verified_png_1["default"], alt: "verified icon", draggable: false })),
                                        react_1["default"].createElement("span", null, "SOCKS \u00A0 452047208")),
                                    react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"]["price__sockholder-price"] },
                                        react_1["default"].createElement("span", null, "$.004754"),
                                        react_1["default"].createElement("span", null,
                                            react_1["default"].createElement(arrow_right_svg_1.ReactComponent, null),
                                            "23.04%")),
                                    react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"]["price__sockholder-details"] }, usdTabDetails.map(function (detail) { return (react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"]["price__sockholder-detail"], key: detail.name },
                                        react_1["default"].createElement("span", null, detail.name),
                                        react_1["default"].createElement("span", null, detail.value))); }))))))),
                react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].grid__right },
                    react_1["default"].createElement(components_1.Card, { className: DashboardTab_module_scss_1["default"].giveaway },
                        react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].giveaway__content },
                            react_1["default"].createElement("span", { className: DashboardTab_module_scss_1["default"].giveaway__title }, "Active Giveaway"),
                            react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].giveaway__grid },
                                react_1["default"].createElement("img", { src: "https://unsplash.it/300/300", className: DashboardTab_module_scss_1["default"].giveaway__img, alt: "" }),
                                react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].giveaway__info },
                                    react_1["default"].createElement("span", { className: DashboardTab_module_scss_1["default"].giveaway__name }, "GENESIS - SOXGEN00"),
                                    react_1["default"].createElement("ul", { className: DashboardTab_module_scss_1["default"].giveaway__details },
                                        react_1["default"].createElement("li", null, "Quantity: 1"),
                                        react_1["default"].createElement("li", null, "ASA ID: 23594871"),
                                        react_1["default"].createElement("li", null, "Enter to win SOXGEN #00.")),
                                    react_1["default"].createElement("p", { className: DashboardTab_module_scss_1["default"].giveaway__text },
                                        "The contest will conclude on July 4th, 2022.",
                                        react_1["default"].createElement("br", null),
                                        react_1["default"].createElement("br", null),
                                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.")))),
                        react_1["default"].createElement(components_1.Button, { className: DashboardTab_module_scss_1["default"].giveaway__action }, "+1 ENTRY")),
                    react_1["default"].createElement(components_1.Card, { className: DashboardTab_module_scss_1["default"].news },
                        react_1["default"].createElement("span", { className: DashboardTab_module_scss_1["default"].news__title }, "News"),
                        react_1["default"].createElement(react_responsive_carousel_1.Carousel, { autoPlay: true, infiniteLoop: true, showStatus: false, showIndicators: false, showThumbs: false, renderArrowPrev: function (clickHandler) { return (react_1["default"].createElement("button", { className: DashboardTab_module_scss_1["default"].news__arrow, "data-prev": true, onClick: clickHandler },
                                react_1["default"].createElement(arrow_right_svg_1.ReactComponent, null))); }, renderArrowNext: function (clickHandler) { return (react_1["default"].createElement("button", { className: DashboardTab_module_scss_1["default"].news__arrow, onClick: clickHandler },
                                react_1["default"].createElement(arrow_right_svg_1.ReactComponent, null))); } },
                            react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].news__slide },
                                react_1["default"].createElement("p", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.")),
                            react_1["default"].createElement("div", { className: DashboardTab_module_scss_1["default"].news__slide },
                                react_1["default"].createElement("p", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."))))),
                react_1["default"].createElement(components_1.TokenTxnModal, { isOpen: scanRewardsInfo.success, onClose: function () {
                        return setScanRewardsInfo(__assign(__assign({}, scanRewardsInfo), { success: false }));
                    }, title: "Daily Rewards", subtitle: "Claimed", currency: "$SOCKS tokens", data: scanRewardsInfo, addr: selectedAccount }),
                react_1["default"].createElement(components_1.OptInModal, { isOpen: isOptinModal, onClose: function () { return setIsOptinModal(false); }, data: scanRewardsInfo, addr: selectedAccount })))));
};
