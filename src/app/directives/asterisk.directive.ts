import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[Asterisk]',
  standalone: true,
})
export class AsteriskDirective implements OnInit {
  constructor(private renderer: Renderer2, private element: ElementRef) {}
  ngOnInit() {
    this.element.nativeElement?.classList.add('asterisk');
  }
}
