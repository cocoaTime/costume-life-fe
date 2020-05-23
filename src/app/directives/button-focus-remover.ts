import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[focusRemove]'
})
export class FocusRemoverDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  @HostListener('click') onClick() {
    this.renderer.invokeElementMethod(this.elRef.nativeElement, 'blur', []);
  }
}
