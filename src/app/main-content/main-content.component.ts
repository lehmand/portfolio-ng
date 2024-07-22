import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutMeSectionComponent } from './about-me-section/about-me-section.component';
import { SkillsSectionComponent } from './skills-section/skills-section.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [HeroSectionComponent, AboutMeSectionComponent, SkillsSectionComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
