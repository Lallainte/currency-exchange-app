interface Currency {
    code: string;
    country: string;
    rates: number;
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
