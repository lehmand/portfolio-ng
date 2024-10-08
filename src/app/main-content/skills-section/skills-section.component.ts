import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { LanguageService } from '../../shared/language.service';
import { Subscription } from 'rxjs';
import { MYSKILLSTRANSLATIONS } from '../../shared/translations';

interface Skill {
  name: string;
  iconUrl: string;
  status: string;
}

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
  animations: [
    trigger('iconAnimation', [
      state('initial', style({ transform: 'translateX(0)', opacity: 1 })),
      state('animated', style({ transform: 'translateX(0)', opacity: 1 })),

      transition('initial => animated', [
        animate(
          '75ms ease-in-out',
          style({ transform: 'translateX(65%)', opacity: 0 })
        ),
        animate(
          '75ms ease-in-out',
          style({ transform: 'translateX(-65%)', opacity: 1 })
        ),
        animate(
          '75ms ease-in-out',
          style({ transform: 'translateX(0%)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class SkillsSectionComponent implements OnInit, OnDestroy {
  status: 'initial' | 'animated' = 'initial';

  constructor(private lang: LanguageService) {}

  arrowToRight: string[] = [
    '/assets/icons/animations/arrow-to-right/arrow-to-right1.png',
    '/assets/icons/animations/arrow-to-right/arrow-to-right2.png',
    '/assets/icons/animations/arrow-to-right/arrow-to-right3.png',
  ];

  currentIndex: number = 0;
  currentImage: string = this.arrowToRight[this.currentIndex];
  private animationId: any;
  private langSub: Subscription | undefined;

  skills: Skill[] = [
    {
      name: 'Angular',
      iconUrl: '/assets/icons/skills/angular.png',
      status: 'initial',
    },
    {
      name: 'TypeScript',
      iconUrl: '/assets/icons/skills/typescript.png',
      status: 'initial',
    },
    {
      name: 'JavaScript',
      iconUrl: '/assets/icons/skills/javascript.png',
      status: 'initial',
    },
    {
      name: 'HTML',
      iconUrl: '/assets/icons/skills/html.png',
      status: 'initial',
    },
    { name: 'CSS', iconUrl: '/assets/icons/skills/css.png', status: 'initial' },
    {
      name: 'Firebase',
      iconUrl: '/assets/icons/skills/firebase.png',
      status: 'initial',
    },
    { name: 'Git', iconUrl: '/assets/icons/skills/git.png', status: 'initial' },
    {
      name: 'Scrum',
      iconUrl: '/assets/icons/skills/scrum.png',
      status: 'initial',
    },
    {
      name: 'Rest-Api',
      iconUrl: '/assets/icons/skills/api.png',
      status: 'initial',
    },
    {
      name: 'Material Design',
      iconUrl: '/assets/icons/skills/material.png',
      status: 'initial',
    },
  ];

  translations: any = {}

  isGerman: boolean = false;

  ngOnInit(): void {
    this.langSub = this.lang.german$.subscribe(isGerman => {
      this.isGerman = isGerman;
      this.translations = isGerman ? MYSKILLSTRANSLATIONS.de : MYSKILLSTRANSLATIONS.en;
    });
    this.isGerman = this.lang.isGerman();
    this.translations = this.lang.isGerman() ? MYSKILLSTRANSLATIONS.de : MYSKILLSTRANSLATIONS.en;
  }

  ngOnDestroy(): void {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }

  playAnimation() {
    this.animationId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.arrowToRight.length;
      this.currentImage = this.arrowToRight[this.currentIndex];
      if(this.currentIndex === 2){
        clearInterval(this.animationId);
      }
    }, 75);
  }

  resetAnimation(){
    this.currentIndex = 0;
    this.currentImage = this.arrowToRight[this.currentIndex];
  }

  animate(index: number) {
    this.skills[index].status = 'animated';
  }

  animationDone(index: number) {
    setTimeout(() => {
      this.skills[index].status = 'initial';
    },250)
  }
}
