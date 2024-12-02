import { Component, QueryList, ViewChild, ViewChildren, OnInit, AfterViewInit } from '@angular/core';
import { Currency, ResultOfConversion } from './models/main-page.model';
import { CurrencyConversionService } from './services/main-page.services';
import { LovComponent } from '@core/shared-component/lov/lov.component';
import { TableComponent } from '@core/shared-component/table/table.component';
import { MessageBoxService } from '@core/service/message-box.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var particlesJS: any;

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewInit {
  @ViewChild('TableComponent') table: TableComponent;
  @ViewChildren('LovComponent') lov: QueryList<LovComponent>;

  columnMap = [
    { label: 'Code', key: 'code' },
    { label: 'Country', key: 'country' },
    { label: 'Rate', key: 'rates' },
    { label: 'Value', key: 'value' }
  ];

  currencies: Currency[] = [];
  showResult = false;
  showConvertButton = true;
  conversionResult: ResultOfConversion;
  conversionForm: FormGroup;
  fromCode: string;
  toCode: string;

  constructor(
    private service: CurrencyConversionService,
    private message: MessageBoxService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStoredCurrencies();
  }

  ngAfterViewInit(): void {
    this.initParticles();
  }

  private initParticles(): void {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#fbff0e'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.5,
          random: false,
          animation: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          animation: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#fbff0e',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }

  initForm(): void {
    this.conversionForm = this.fb.group({
      amount: [null, Validators.required],
      from: [undefined, Validators.required],
      to: [undefined, Validators.required],
    });
  }

  loadStoredCurrencies(): void {
    const saved = localStorage.getItem('dataCurrencies');
    if (saved) {
      this.currencies = JSON.parse(saved);
    } else {
      this.fetchAllCurrencies();
    }
  }

  calculateRates(): void {
    const form = this.conversionForm.getRawValue();

    const before = `${form.amount.toLocaleString('en', {
      minimumFractionDigits: 2,
    })} ${form.from.name} =`;

    const result = `${(form.to.value / form.from.value) * form.amount} ${form.to.name}`;

    const fromRate = `100.00 ${form.from.code} = ${
      form.to.value / form.from.value
    } ${form.to.code}`;

    const toRate = `100.00 ${form.to.code} = ${
      form.from.value / form.to.value
    } ${form.from.code}`;

    this.conversionResult = {
      beforeConversion: before,
      resultConversion: result,
      rateCurrencyFirst: fromRate,
      rateCurrencySecond: toRate,
    };
  }

  onFromSelect(event): void {
    this.conversionForm.get('from').patchValue(event);
    this.calculateIfValid();
  }

  onToSelect(event): void {
    this.conversionForm.get('to').patchValue(event);
    this.calculateIfValid();
  }

  onAmountChange(event): void {
    this.calculateIfValid();
  }

  calculateIfValid(): void {
    if (this.conversionForm.valid) {
      this.calculateRates();
    } else {
      this.conversionForm.markAllAsTouched();
    }
  }

  convert(): void {
    if (this.conversionForm.valid) {
      this.calculateRates();
      this.showResult = true;
      this.showConvertButton = false;
    } else {
      this.conversionForm.markAllAsTouched();
      this.message.showInfo("Form tidak boleh kosong");
    }
  }

  swap(): void {
    const from = this.conversionForm.get('from').getRawValue();

    this.conversionForm.get('from').patchValue(
      this.conversionForm.get('to').getRawValue()
    );
    this.conversionForm.get('to').patchValue(from);

    this.calculateIfValid();
  }

  fetchAllCurrencies(): void {
    this.service.getCurrencies().subscribe({
      next: (response) => {
        const mappedData = this.mapCurrencyData(response);
        this.fetchRates(mappedData);
      },
      error: (error) => {
        this.message.showError('Gagal mengambil data mata uang');
      },
    });
  }
  mapCurrencyData(response: any): Currency[] {
    const data = [];
    response.map((currency: any) => {
      const country = currency.name.common;
      for (const key in currency.currencies) {
        const element = currency.currencies[key];
        data.push({
          lovLabel: `${key} - ${country}`,
          country,
          code: key,
          rates: this.calculateRates,
          ...element,
        });
      }
    });
    return data;
  }

  fetchRates(data: Currency[]): void {
    this.service.getRate().subscribe({
      next: (rateResponse) => {
        this.updateRates(data, rateResponse);
      },
      error: (error) => {
        this.message.showError('Gagal mengambil nilai tukar');
      },
    });
  }

  updateRates(data: Currency[], rates: any): void {
    data.forEach((currency, index) => {
      const rate = rates[currency.rates];

      if (rate) {
        data[index] = {
          ...currency,
          rates: Math.round(rate),
          value: rate,
        };
      }
    });

    this.service.setLocalStorageCurrency('dataCurrencies', data);
    this.currencies = data;
  }
}
