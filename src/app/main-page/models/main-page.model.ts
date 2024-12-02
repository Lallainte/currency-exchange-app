interface Currency {
    code: string;
    country: string;
    rate: number;
    name: string;
    symbol: string;
    value: number;
    lovLabel: string;
}

interface ResultOfConversion {
    rateCurrencyFirst: string;
    rateCurrencySecond: string;
    beforeConversion: string;
    resultConversion: string;
}

export { Currency, ResultOfConversion };
