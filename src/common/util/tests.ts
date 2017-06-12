import {By} from '@angular/platform-browser';

export const getChildDebugElement = (fixture, component) =>
    fixture.debugElement.query(By.directive(component));

export const getChildInstance = (fixture, component) =>
    getChildDebugElement(fixture, component).injector.get(component);

export const getChildDebugElementByCss = (fixture, selector) =>
    fixture.debugElement.query(By.css(selector));
