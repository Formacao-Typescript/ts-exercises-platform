import React from 'react';

import { Container } from './styles';

const FTSLoading: React.FC = () => {
  return (
    <Container id="fts-loading" className="fts-loading">
      <div className="fts-loading-changing-background"></div>
      <div className="logo">
        <div className="logo-background">
          <div className="logo-content">
            <span className="logo-content-slashes">&slash;&slash;</span>
            <span className="logo-content-text">formação</span>
            <span className="logo-content-ts">TS</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FTSLoading;

// FIXME: this is a port from the fts-lead-page project (in Astro), since we're in React now
// the following Javascript code needs proper working.
// <script async>
//   function animationStart() {
//     console.log('animationStart')
//     const ftsChangingBackground = document.querySelector('.fts-loading-changing-background');
//     /*
//     FIXME: just figured I could have organized all the different-object animations in a single
//     cohesive animation using anime.timeline(...).add(...) 🤦🏻‍♂️.
//     this can definitely be improved in a near future :)
//     leaving a good ref here: https://animejs.com/documentation/#colors
//     */
//     window.anime({
//       targets: ftsChangingBackground,
//       width: 0,
//       height: 0,
//       duration: 300,
//       easing: 'linear',
//     });
//     window.anime({
//       targets: '#fts-loading .logo-background',
//       padding: ['0px','4px', '2px'],
//       duration: 300,
//       delay: 300,
//       easing: 'linear',
//       complete: () => {
//         window.anime({
//           targets: '#fts-loading .logo',
//           fontSize: ['4rem', '2rem'],
//           duration: 300,
//           easing: 'linear',
//           complete: () => {
//             document.querySelector('#fts-loading .logo-content-slashes').style.display = 'inline';
//             window.anime({
//               targets: '#fts-loading .logo-content-slashes',
//               width: 'auto',
//               opacity: [0, 1],
//               // easing: 'easeOutExpo',
//               duration: 300,
//               delay: 100,
//               complete: () => {
//                 document.querySelector('#fts-loading .logo-content-text').style.display = 'inline';
//                 window.anime({
//                   targets: '#fts-loading .logo-content-text',
//                   width: 'auto',
//                   opacity: [0, 1],
//                   // easing: 'easeOutExpo',
//                   duration: 300,
//                   delay: 100,
//                   complete: () => {
//                     window.anime({
//                       targets: ftsChangingBackground,
//                       width: '200vw',
//                       height: '200vh',
//                       duration: 800,
//                       easing: 'linear',
//                       fill: 'forwards',
//                       complete: () => {
//                         ftsChangingBackground.style.width = '200vw';
//                         ftsChangingBackground.style.height = '200vh';
//                         document.querySelector('#fts-loading').style.background = 'transparent';
//                         window.anime({
//                           targets: '#fts-loading',
//                           opacity: [1, 0],
//                           easing: 'linear',
//                           duration: 400,
//                           complete: () => {
//                             document.querySelector('#fts-loading').style.display = 'none';
//                           }
//                         });
//                       }
//                     })
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     });

//   }

//   window.addEventListener('load', () => {
//     setTimeout(() => {
//       animationStart();
//     }, 1000);
//     // animationStart();
//   });
// </script>
