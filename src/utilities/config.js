import * as contractJson2 from '../utilities/DEXHIGH2.json';
import * as contractJson3 from '../utilities/DEXHIGH3.json';


export const config = {

    ownerId: 1,
    basePrice: "10000000000",
    trades: [
        {
            productName: "BAT",
            decimal: "1000000000000000000",
            productId: 3,
            tokenAddress: "0x8f803178891e51e055a4542788678b134435b613",
            logo: ""
        },
        {
            productName: "OMG",
            decimal: "1000000000000000000",
            productId: 4,
            tokenAddress: "0x10e4437cd6ab32d11a4b0d983157fe1dffc673c4",
            logo: ""
        },
        {
            productName: "VIKKY",
            decimal: "1000000000000000000",
            productId: 5,
            tokenAddress: "0x873f4f3105377427c47c643221e7f250a5b4ddcf",
            logo: ""
        },
        {
            productName: "BTCB",
            decimal: "1000000000000000000",
            productId: 6,
            tokenAddress: "0xb15596d37ec8ca879dc9bfbc1da92331ca6497be",
            logo: ""
        },
        {
            productName: "NDI",
            decimal: "1000000000000000000",
            productId: 7,
            tokenAddress: "0xc4c4c06ffad6f5e4099c754d1e58d6cec6d20b5f",
            logo: ""
        },
        {
            productName: "VAT",
            decimal: "1000000000000000000",
            productId: 8,
            tokenAddress: "0x3c6eb741bfec2f7916f6ea9b84f1494b02fe23d8",
            logo: ""
        },
        {
            productName: "BNB",
            decimal: "1000000000000000000",
            productId: 9,
            tokenAddress: "0xd2aff1f2debe1120b4674b0b63e822dfc421c446",
            logo: ""
        },
        {
            productName: "ICON",
            decimal: "1000000000000000000",
            productId: 10,
            tokenAddress: "0xcfc701dd1570e5bf7fff2e57176e7dae7c858132",
            logo: ""
        },
        {
            productName: "TUSD",
            decimal: "1000000000000000000",
            productId: 11,
            tokenAddress: "0xb7c6ef39ba505bfdb560f0cd32c84963e3d8bcbe",
            logo: ""
        },
        {
            productName: "VIEN",
            decimal: "1000000000000000000",
            productId: 12,
            tokenAddress: "0x13f59e0ed9224f646a94f28ca8120fc011b890b8",
            logo: ""
        },
        {

        }
    ],
    base: [
        {
            productName: "ETH",
            productId: 1,
            tokenAddress: "0x0000000000000000000000000000000000000000",
            decimal: "1000000000000000000"
        },
        {
            productName: "LNC",
            productId: 2,
            tokenAddress: "0x81d0a10c4478d6d0aea604aa4aa5a3154efa5bbd",
            decimal: "1000000000000000000"
        }
    ],
    market: [
        {
            base: 1,
            trade: [3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            base: 2,
            trade: [3, 7, 8, 9, 10]
        }
    ]
};

export const filterMarkets = () => {
    let markets = [];
    config.market.forEach(obj => {
        let trades = [];
        let base = config.base.find(o => o.productId === obj.base);
        obj.trade.forEach(y => {
            let tradeObject = config.trades.find(x => x.productId === y);
            trades.push(tradeObject);
        });

        markets.push({
            market: Object.assign({},{
                productName: base.productName,
                productId: base.productId,
                tokenAddress: base.tokenAddress,
                decimal: base.decimal,
                trades: trades
            })
        });
    });
    return markets;
}


export const contractList = [
    {
        name: "Latest",
        address: "0xf6537c10c03f41b3af2d462a759195ef64679aff",
        abifile: contractJson2.default
    },
    {
        name: "Order",
        address: "0x6be6a4bdc15e8ce8986dd58677f93c312484cdc0",
        abifile: contractJson3.default
    },
    {
        name: "Original",
        address: "0x13f59e0ed9224f646a94f28ca8120fc011b890b8",
        abifile: contractJson2.default
    }
]