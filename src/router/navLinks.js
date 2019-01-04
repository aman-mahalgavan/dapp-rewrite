import HomeContainer from '../containers/homeContainer';
import ExchangeContainer from '../containers/exchangeContainer';
import WalletContainer from '../containers/walletContainer';
import TransactionContainer from '../containers/transactionContainer';
import noticeContainer from '../containers/noticeContainer'
import informationUse from '../containers/informationUse'
import feeInformation from '../containers/feeInformation'
import termsOfUse from '../containers/termsOfUse'
import privacyPolicy from '../containers/privacyPolicy'
import ListingRequest from '../containers/ListingRequest'

const links = [
    {
        name: "Home",
        path: "/",
        component: HomeContainer
    },
    {
        name: "Exchange",
        path: "/exchange",
        component: ExchangeContainer,
        langname : "EXCHANGE"
    },
    {
        name: "Wallet",
        path: "/wallet",
        component: WalletContainer,
        langname : "WALLET"
    },
    {
        name: "Transaction Details",
        path: "/transactionDetails",
        component: TransactionContainer,
        langname : "TRANSACTIONDETAILS"
    },
    {
        name: "noticeContainer",
        path: "/noticeContainer",
        component: noticeContainer,
        langname : "noticeContainer"
    },
    {
        name: "informationUse",
        path: "/informationUse",
        component: informationUse,
        langname : "informationUse"
    },
    {
        name: "feeInformation",
        path: "/feeInformation",
        component: feeInformation,
        langname : "feeInformation"
    },
    {
        name: "termsOfUse",
        path: "/termsOfUse",
        component: termsOfUse,
        langname : "termsOfUse"
    },
    {
        name: "privacyPolicy",
        path: "/privacyPolicy",
        component: privacyPolicy,
        langname : "privacyPolicy"
    },
    {
        name: "ListingRequest",
        path: "/ListingRequest",
        component: ListingRequest,
        langname : "ListingRequest"
    }
];

export default links;