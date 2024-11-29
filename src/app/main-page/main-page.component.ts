import { Currency, ResultOfConversion } from './models/main-page.model';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CurrencyConversionService } from './services/main-page.services';
import { LovComponent } from '@core/shared-component/lov/lov.component';
import { TableComponent } from '@core/shared-component/table/table.component';
import { MessageBoxService } from '@core/service/message-box.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [],
})
export class MainPageComponent {
  @ViewChild('TableComponent') table: TableComponent;
  @ViewChildren('LovComponent') lov: QueryList<LovComponent>;

  columnMap: { label: string; key: string }[] = [
    { label: 'Code', key: 'code' },
    { label: 'Country', key: 'country' },
    { label: 'Rate', key: 'rate' },
    { label: 'Value', key: 'value' },
  ];

  dataCurrencies: Currency[] = [];
  showResultConversion: boolean = false;
  showButtonConvert: boolean = true;
  resultConversionData: ResultOfConversion;
  formConversion: FormGroup;
  currencyFirstCode: string;
  currencySecondCode: string;

  constructor(
    private currenciesService: CurrencyConversionService,
    private messageBoxService: MessageBoxService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormConversion();
    this.loadCurrenciesFromLocalStorage();
  }

  initFormConversion(): void {
    this.formConversion = this.formBuilder.group({
      amount: [null, Validators.required],
      currencyFirst: [undefined, Validators.required],
      currencySecond: [undefined, Validators.required],
    });
  }

  loadCurrenciesFromLocalStorage(): void {
    const savedCurrencies = localStorage.getItem('dataCurrencies');
    if (savedCurrencies) {
      this.dataCurrencies = JSON.parse(savedCurrencies);
    } else {
      this.fetchCurrenciesFromApi();
    }
  }

  calculateCurrencies(): void {
    const formValue = this.formConversion.getRawValue();
    const beforeConversion = `${formValue.amount.toLocaleString('en', {
      minimumFractionDigits: 2,
    })} ${formValue.currencyFirst.name} =`;

    const resultConversion = `${
      (formValue.currencySecond.value /
        formValue.currencyFirst.value) *
      formValue.amount
    } ${formValue.currencySecond.name}`;

    const rateCurrencyFirst = `1.00 ${formValue.currencyFirst.code} = ${
      formValue.currencySecond.value / formValue.currencyFirst.value
    } ${formValue.currencySecond.code}`;

    const rateCurrencySecond = `1.00 ${formValue.currencySecond.code} = ${
      formValue.currencyFirst.value / formValue.currencySecond.value
    } ${formValue.currencyFirst.code}`;

    this.resultConversionData = {
      beforeConversion,
      resultConversion,
      rateCurrencyFirst,
      rateCurrencySecond,
    };
  }

  onSelectedCurrencyFirst(event): void {
    this.formConversion.get('currencyFirst').patchValue(event);
    this.calculateCurrenciesIfFormValid();
  }

  onSelectedCurrencySecond(event): void {
    this.formConversion.get('currencySecond').patchValue(event);
    this.calculateCurrenciesIfFormValid();
  }

  onInputNumber(event): void {
    this.calculateCurrenciesIfFormValid();
  }

  calculateCurrenciesIfFormValid(): void {
    if (this.formConversion.valid) {
      this.calculateCurrencies();
    } else {
      this.formConversion.markAllAsTouched();
    }
  }

  onClickConvert(): void {
    if (this.formConversion.valid) {
      this.calculateCurrencies();
      this.showResultConversion = true;
      this.showButtonConvert = false;
    } else {
      this.formConversion.markAllAsTouched();
      this.messageBoxService.showInfo("Form tidak boleh kosong");
    }
  }

  swapCurrencies(): void {
    const currencyFirst = this.formConversion
      .get('currencyFirst')
      .getRawValue();

    this.formConversion.get('currencyFirst').patchValue(
      this.formConversion.get('currencySecond').getRawValue()
    );
    this.formConversion.get('currencySecond').patchValue(currencyFirst);

    this.calculateCurrenciesIfFormValid();
  }

  fetchCurrenciesFromApi(): void {
    this.currenciesService.getCurrencies().subscribe({
      next: (response) => {
        const result = this.mapCurrencies(response);
        this.fetchExchangeRates(result);
      },
      error: (error) => {
        this.messageBoxService.showError('Gagal mengambil data mata uang');
      },
    });
  }

  mapCurrencies(response: any): Currency[] {
    const result = [];
    response.map((currency: any) => {
      const country = currency.name.common;
      for (const key in currency.currencies) {
        const element = currency.currencies[key];
        result.push({
          lovLabel: `${key} - ${country}`,
          country,
          code: key,
          ...element,
        });
      }
    });
    return result;
  }

  fetchExchangeRates(result: Currency[]): void {
    this.currenciesService.getRate().subscribe({
      next: (rateResponse) => {
        this.updateCurrencyRates(result, rateResponse.body.rates);
      },
      error: (error) => {
        this.messageBoxService.showError('Gagal mengambil nilai tukar');
      },
    });
  }


  updateCurrencyRates(result: Currency[], rates: any): void {
    result.forEach((currency, index) => {
      const rate = rates[currency.code];
      if (rate) {
        result[index] = {
          ...currency,
          rates: Math.round(rate),
          value: rate,
        };
      }
    });

    this.currenciesService.setLocalStorageCurrency('dataCurrencies', result);
    this.dataCurrencies = result;
  }
}
