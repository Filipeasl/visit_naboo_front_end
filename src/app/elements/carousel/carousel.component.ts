import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  images: string[] = [
    './assets/images/1-66ea26f10b2a4_attack_of___Balanced.jpg',
    './assets/images/1-66ea26f96f34b_4380253__Balanced.jpg',
    './assets/images/1-66ea27cdcee27_5955775__Balanced.jpg',
    './assets/images/1-66ea27e4b0e52_ian_vickna__Balanced.jpg',
    './assets/images/1-66ea281c0341e_mattgallod__Balanced.jpg',
    './assets/images/1-66ea256186bf7_naboo_plan__Balanced.jpg'
  ];

  currentSlide = 0;
  slideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval); // Clear interval when the component is destroyed
    }
  }

  get transform(): string {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Switch slide every 3 seconds
  }
}
