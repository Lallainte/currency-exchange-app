import { Input, OnInit, Component } from '@angular/core';

@Component({
  selector: 'box-data-comp',
  styleUrls: ['./box-data.component.scss'],
  templateUrl: './box-data.component.html',
})
export class BoxDataSharedComponent implements OnInit {
  @Input() value: any = '-'; 
  @Input() style: string;
  @Input() italic: boolean | undefined = true
  @Input() useValue: boolean | undefined = true

  public ngOnInit(): void {}
}
