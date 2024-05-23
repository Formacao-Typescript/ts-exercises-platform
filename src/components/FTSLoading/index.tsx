import React, { useEffect } from 'react';

import { Container } from './styles';
import { useFTSLoading } from '@/store/navigation';
import anime from 'animejs';
import FTSLogo from '../FTSLogo';

/*  FIXME: The following workaround is a port from the fts-lead-page project (in Astro), 
    this SURELY needs refactoring 😆. If you're an interested explorer from the open-source community, 
    consider this an easter egg (and also please pretend you didn't see what's happening from this line on 👋)
    
    > "Every great project has a trail of brilliant workarounds behind it." - Sun Tzu, probably. 
    >                                                                                  - Wells 🚀 
*/
const FTSLoading: React.FC = () => {
  const [active, setActive] = useFTSLoading();

  function animationReset() {
    const changingBackground: HTMLElement = document.querySelector(
      '.fts-loading-changing-background'
    )!;
    const logoSlashes: HTMLElement = document.querySelector(
      '#fts-loading .logo-content-slashes'
    )!;
    const logoText: HTMLElement = document.querySelector(
      '#fts-loading .logo-content-text'
    )!;
    const loadingContainer: HTMLElement =
      document.querySelector('#fts-loading')!;

    logoSlashes.style.display = 'none';
    logoText.style.display = 'none';
    loadingContainer.style.display = 'flex';

    changingBackground.style.width = '140px';
    changingBackground.style.height = '140px';
    loadingContainer.style.background = '#0b0b20';
  }

  function closingAnimation() {
    const changingBackground: HTMLElement = document.querySelector(
      '.fts-loading-changing-background'
    )!;
    const logoSlashes: HTMLElement = document.querySelector(
      '#fts-loading .logo-content-slashes'
    )!;
    const logoText: HTMLElement = document.querySelector(
      '#fts-loading .logo-content-text'
    )!;
    const loadingContainer: HTMLElement =
      document.querySelector('#fts-loading')!;

    anime
      .timeline({
        targets: changingBackground,
        width: 0,
        height: 0,
        duration: 300,
        easing: 'linear',
      })
      .add({
        targets: '#fts-loading .logo-background',
        padding: ['0px', '4px', '2px'],
        duration: 300,
        delay: 1000,
        easing: 'linear',
        complete: () => {
          anime({
            targets: '#fts-loading .logo',
            fontSize: ['4rem', '2rem'],
            duration: 300,
            easing: 'linear',
            complete: () => {
              logoSlashes.style.display = 'inline';
              anime({
                targets: '#fts-loading .logo-content-slashes',
                width: 'auto',
                opacity: [0, 1],
                // easing: 'easeOutExpo',
                duration: 300,
                delay: 100,
                complete: () => {
                  logoText.style.display = 'inline';
                  anime({
                    targets: '#fts-loading .logo-content-text',
                    width: 'auto',
                    opacity: [0, 1],
                    // easing: 'easeOutExpo',
                    duration: 300,
                    delay: 100,
                    complete: () => {
                      anime({
                        targets: changingBackground,
                        width: '200vw',
                        height: '200vh',
                        duration: 800,
                        easing: 'linear',
                        fill: 'forwards',
                        complete: () => {
                          changingBackground.style.width = '200vw';
                          changingBackground.style.height = '200vh';
                          loadingContainer.style.background = 'transparent';
                          anime({
                            targets: '#fts-loading',
                            opacity: [1, 0],
                            easing: 'linear',
                            duration: 400,
                            complete: () => {
                              loadingContainer.style.display = 'none';
                              setActive(false);
                            },
                          });
                        },
                      });
                    },
                  });
                },
              });
            },
          });
        },
      });
  }

  useEffect(() => {
    if (active) {
      animationReset();
      setTimeout(() => {
        closingAnimation();
      }, 1000);
    }
  }, [active]);
  return (
    <Container id="fts-loading" className="fts-loading">
      <div className="fts-loading-changing-background"></div>
      <FTSLogo scale={3} />
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
//     anime({
//       targets: ftsChangingBackground,
//       width: 0,
//       height: 0,
//       duration: 300,
//       easing: 'linear',
//     });
//     anime({
//       targets: '#fts-loading .logo-background',
//       padding: ['0px','4px', '2px'],
//       duration: 300,
//       delay: 300,
//       easing: 'linear',
//       complete: () => {
//         anime({
//           targets: '#fts-loading .logo',
//           fontSize: ['4rem', '2rem'],
//           duration: 300,
//           easing: 'linear',
//           complete: () => {
//             document.querySelector('#fts-loading .logo-content-slashes').style.display = 'inline';
//             anime({
//               targets: '#fts-loading .logo-content-slashes',
//               width: 'auto',
//               opacity: [0, 1],
//               // easing: 'easeOutExpo',
//               duration: 300,
//               delay: 100,
//               complete: () => {
//                 document.querySelector('#fts-loading .logo-content-text').style.display = 'inline';
//                 anime({
//                   targets: '#fts-loading .logo-content-text',
//                   width: 'auto',
//                   opacity: [0, 1],
//                   // easing: 'easeOutExpo',
//                   duration: 300,
//                   delay: 100,
//                   complete: () => {
//                     anime({
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
//                         anime({
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
