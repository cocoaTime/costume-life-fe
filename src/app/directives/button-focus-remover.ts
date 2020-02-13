import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

/**
 * This directive removes focus from the selectors after clicking on them
 */
@Directive({
  selector: '[appFocusRemove]' // your selectors here!
})
export class FocusRemoverDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  @HostListener('click') onClick() {
    this.renderer.invokeElementMethod(this.elRef.nativeElement, 'blur', []);
  }
}
