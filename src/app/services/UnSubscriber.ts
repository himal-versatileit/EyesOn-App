import { Component, OnDestroy } from "@angular/core";
import { ViewWillLeave } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  template: "",
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UnSubscriber implements ViewWillLeave, OnDestroy {
  private subscriptions = new Subscription();

  /**
   * Adds a new subscription to the internal list.
   * @param sub The subscription to add.
   */
  protected addSubscription(sub: Subscription): void {
    this.subscriptions.add(sub);
  }

  /**
   * Resets and unsubscribes from all stored subscriptions.
   */
  protected resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
  }

  /**
   * Called by the Ionic lifecycle when the view is about to leave.
   * This method ensures all subscriptions are unsubscribed.
   */
  ionViewWillLeave(): void {
    this.resetSubscriptions();
  }

  /**
   * Called when the component is destroyed.
   * Ensures all subscriptions are unsubscribed to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.resetSubscriptions();
  }
}
