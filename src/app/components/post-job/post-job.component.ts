import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Workers } from '../../services/workers.service';

@Component({
  selector: 'bs-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements AfterViewInit {
  @ViewChild('addressInput') addressInput: ElementRef;

  profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    place: ['', Validators.required],
    position: [],
    dateOfBirth: [null, Validators.required],
    ratePerHour: [null, Validators.required],
    phone: [null, Validators.required]
  });

  avatarUrl = '../../assets/img/woman-avatar.jpg';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private workers: Workers
    ) { }

  ngAfterViewInit(): void {
    this.getPlaceAutocomplete();
  }

private getPlaceAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      const position: google.maps.LatLngLiteral = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.profileForm.patchValue(place);
      this.profileForm.patchValue({position});
    });
  }

  uploadAvatar(): void {
    // TODO: upload avatar
    console.log('upload avatar');
  }

  onSubmit(): void {
    // TODO: 1. Use service with the form value and add the new object to DB
    // 2.then navigate to the map and center to the new marker
    // 3. Error handling- what happnes if the address is not recognized by google?
    console.log(this.profileForm.value);
    this.workers.addWorker(this.profileForm.value).subscribe();
    this.router.navigateByUrl('/');
  }

  back(): void {
    let canLeave = true;
    if (this.profileForm.dirty) {
      canLeave = confirm('לעזוב בלי לשמור שינויים?');
    }
    if (canLeave) {
      this.location.back();
    }
  }
}
