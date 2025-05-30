import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styles: `/* .title{
              width: 100%;
              height: 400px;
              background-image: url("/assets/about/about2.jpg");
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }
            .indented {
              text-indent: 2em;
              text-align:justify;
            }  */
.title {
  width: 100%;
  height: 400px;
  background-image: url("/assets/about/about2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.55); /* затемнение */
  padding: 40px 20px;
  backdrop-filter: blur(2px);
}

.indented {
  text-indent: 2em;
  text-align: justify;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #333;
}

.content-text {
  max-width: 850px;
}


            `
})
export class AboutComponent {

}
